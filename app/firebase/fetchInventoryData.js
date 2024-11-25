import { fireDb } from './initializeFirebase'; // Import initialized Firestore
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetch inventory data to create a histogram
 */
export const fetchInventoryData = async () => {
  try {
    const inventoryCollection = collection(fireDb, 'inventory'); // Replace with your collection name
    const snapshot = await getDocs(inventoryCollection);

    // Reduce the snapshot into a histogram-like structure
    const inventoryData = snapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      const name = data.name || 'Unknown'; // Default to 'Unknown' if name is missing
      const count = parseInt(data.count || 0, 10); // Default to 0 if count is missing

      acc[name] = (acc[name] || 0) + count;
      return acc;
    }, {});

    console.log('Inventory data:', inventoryData);
    return inventoryData;
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
