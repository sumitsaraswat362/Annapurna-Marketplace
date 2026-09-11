const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore({ projectId: 'project-a9c284f8-6bca-440a-a0c' });

async function clean() {
  const snapshot = await firestore.collection('listings').get();
  const batch = firestore.batch();
  let count = 0;
  
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    // Delete if price is crazy, or if image is missing/broken (blob urls don't work)
    if (
      data.askingPricePerKg > 10000 || 
      !data.qualityPhotoUrl || 
      data.qualityPhotoUrl.startsWith('blob:')
    ) {
      console.log(`Deleting: ${data.cropType} - ₹${data.askingPricePerKg}`);
      batch.delete(doc.ref);
      count++;
    }
  });
  
  if (count > 0) {
    await batch.commit();
  }
  console.log(`Successfully deleted ${count} bad/old listings.`);
}

clean().catch(console.error);
