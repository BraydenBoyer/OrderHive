import { fireDb } from './initializeFirebase'; // Import initialized Firestore
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetch total orders by country from the "customers" collection
 */
export const fetchCountryOrders = async () => {
  try {
    const customersCollection = collection(fireDb, 'customers'); // Replace 'customers' with the exact name of your collection
    const snapshot = await getDocs(customersCollection);

    const countryOrders = snapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      const country = data.location || 'Unknown'; // Default to 'Unknown' if location is missing
      const totalOrders = data.totalOrders || 0; // Default to 0 if totalOrders is missing

      if (!acc[country]) {
        acc[country] = 0;
      }
      acc[country] += totalOrders;

      return acc;
    }, {});

    console.log('Total orders by country:', countryOrders);
    return countryOrders;
  } catch (error) {
    console.error('Error fetching country orders:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
