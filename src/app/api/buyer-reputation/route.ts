import { NextResponse } from 'next/server';
import { Firestore } from '@google-cloud/firestore';

export const runtime = 'nodejs';

const firestore = new Firestore({ projectId: 'project-a9c284f8-6bca-440a-a0c' });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const buyerId = searchParams.get('buyerId');

    if (!buyerId) {
      return NextResponse.json({ error: 'buyerId is required' }, { status: 400 });
    }

    // Fetch all orders for this buyer
    const ordersSnap = await firestore.collection('orders')
      .where('buyerId', '==', buyerId)
      .get();

    const orders = ordersSnap.docs.map(d => d.data());
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    const cancelledByBuyer = orders.filter(o => o.status === 'cancelled' && o.cancelledBy === 'buyer').length;
    const confirmedOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'in_transit' || o.status === 'delivered').length;

    // Fetch negotiation history for fair bidding score
    const bidsSnap = await firestore.collection('negotiation_history')
      .where('buyerId', '==', buyerId)
      .get();

    const totalBids = bidsSnap.docs.length;
    
    // Check for suspicious patterns
    const bidData = bidsSnap.docs.map(d => d.data());
    const distinctListings = new Set(bidData.map(b => b.listingId));
    const recentBids = bidData.filter(b => b.timestamp > Date.now() - (60 * 60 * 1000));
    const suspiciousFlags = recentBids.length > 15 ? 1 : 0; // >15 bids in 1 hour

    // Calculate reputation score (0-100)
    let score = 20; // Base score for new buyers
    score += completedOrders * 10;          // +10 for each completed order
    score -= cancelledByBuyer * 15;          // -15 for each buyer-cancelled order
    score += Math.min(totalBids * 1, 10);    // +1 per bid, max +10
    score -= suspiciousFlags * 20;           // -20 for suspicious activity
    score = Math.max(0, Math.min(100, score)); // Clamp 0-100

    const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 100;

    // Determine level
    let level: string;
    if (score >= 81) level = 'Premium';
    else if (score >= 51) level = 'Trusted';
    else if (score >= 21) level = 'Verified';
    else level = 'New';

    return NextResponse.json({
      buyerId,
      score,
      level,
      totalOrders,
      completedOrders,
      cancelledByBuyer,
      completionRate,
      totalBids,
      suspiciousFlags,
      distinctListingsBid: distinctListings.size,
    });

  } catch (error) {
    console.error('Buyer reputation API error:', error);
    return NextResponse.json({ error: 'Failed to compute reputation' }, { status: 500 });
  }
}
