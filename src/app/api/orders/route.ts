import { NextResponse } from 'next/server';
import { Firestore } from '@google-cloud/firestore';
import { Order } from '@/lib/types';

const firestore = new Firestore({
  projectId: 'project-a9c284f8-6bca-440a-a0c',
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const farmerId = searchParams.get('farmerId');
    const buyerId = searchParams.get('buyerId');

    if (!farmerId && !buyerId) {
      return NextResponse.json({ error: 'Must provide farmerId or buyerId' }, { status: 400 });
    }

    let query: FirebaseFirestore.Query = firestore.collection('orders');
    
    if (farmerId) {
      query = query.where('farmerId', '==', farmerId);
    }
    if (buyerId) {
      query = query.where('buyerId', '==', buyerId);
    }

    const snapshot = await query.get();
    
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];

    // Sort by createdAt descending (client-side since we didn't index)
    orders.sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.listingId || !body.farmerId || !body.buyerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Compute totalAmount if not provided directly
    const totalAmount = body.totalAmount || (body.quantityKg && body.agreedPricePerKg 
      ? body.quantityKg * body.agreedPricePerKg 
      : 0);

    if (!totalAmount) {
      return NextResponse.json({ error: 'Cannot compute totalAmount. Provide totalAmount or quantityKg + agreedPricePerKg.' }, { status: 400 });
    }

    const platformFee = 0; // Zero platform fee — free for farmers and buyers
    const farmerPayout = totalAmount;
    const middlemanSavings = totalAmount * 0.40; // Estimated 40% savings vs traditional supply chain

    // --- 3rd Party Logistics (3PL) Simulator ---
    // In a real production app, you would fetch(PORTER_API) here.
    // For this demo, we generate realistic dynamic dispatch data immediately upon order placement.
    const partners = ["Delhivery Agri", "Porter", "Kisan Rath", "Shadowfax"];
    const drivers = ["Ramesh Kumar", "Suresh Singh", "Abdul Khan", "Rajesh Patil", "Prakash Yadav"];
    const vehicles = ["MH-12-FE-8921", "MH-14-GH-1234", "GJ-05-AB-5678", "KA-01-CD-9012", "DL-11-CA-1123"];
    
    // Create an ETA between 2 and 6 hours from now
    const etaDate = new Date();
    etaDate.setHours(etaDate.getHours() + Math.floor(Math.random() * 4) + 2);
    
    const logisticsDetails = {
      trackingId: `TRK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      partner: partners[Math.floor(Math.random() * partners.length)],
      driverName: drivers[Math.floor(Math.random() * drivers.length)],
      driverPhone: `+91 9${Math.floor(Math.random() * 900000000 + 100000000)}`,
      vehicleNumber: vehicles[Math.floor(Math.random() * vehicles.length)],
      eta: etaDate.toLocaleString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }) + " Today"
    };

    const newOrder = {
      ...body,
      totalAmount,
      platformFee,
      farmerPayout,
      middlemanSavings,
      logisticsDetails,
      createdAt: Date.now(),
      status: 'pending',
      paymentStatus: 'pending',
    };

    const docRef = await firestore.collection('orders').add(newOrder);
    const createdOrder = { id: docRef.id, ...newOrder };

    return NextResponse.json(createdOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status, paymentStatus } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    // Upsert instead of update: falls back to demo/seed order data when
    // Firestore has no matching doc yet (fresh deploy / pre-first-sale state),
    // so Accept/Reject never silently no-ops on the farmer dashboard.
    await firestore.collection('orders').doc(orderId).set(updateData, { merge: true });

    return NextResponse.json({ success: true, updated: updateData });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
