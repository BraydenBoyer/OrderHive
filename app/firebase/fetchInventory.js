import { fireDb } from "./initializeFirebase.js";
import { collection, getDocs } from "firebase/firestore";

export const fetchInventoryData = async () => {
    try {
        console.log("Attempting to fetch categories in the 'inventory' collection...");


        // Reference the 'inventory' collection
        const inventoryRef = collection(fireDb, 'inventory');
        const categoriesSnapshot = await getDocs(inventoryRef);

        // Check if any documents are found
        if (categoriesSnapshot.empty) {
            console.log("No documents found in 'inventory' collection.");
            return [];
        }

        // Map over each document to get its data
        const categories = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("Fetched categories:", categories);
        return categories;
    } catch (error) {
        console.error("Error fetching categories from 'inventory':", error);
        return [];
    }
};

export const getMarker = async () => {
  try {
    const markers = [];
      await firebase.firestore().collection('inventory').get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
          markers.push(doc.data());
        });
      });
      return markers;

  } catch (error) {
    console.error("Error fetching markers:", error);
    throw error;
  }
};
