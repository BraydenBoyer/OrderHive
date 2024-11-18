/*
    Purpose of this file is to handle functions related to inventory in Firestore
*/

import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { fireDb } from "./initializeFirebase.js";

export const fetchInventoryData = async () => {

    try {
        console.log("Attempting to fetch items in the 'inventory' collection...");

        // Reference to the 'inventory' collection
        const inventoryRef = collection(fireDb, `inventory`);


        const querySnap = query(inventoryRef)

        // Fetch all documents in the collection
        const querySnapshot = await getDocs(querySnap);

        console.log("Inventory docs:", querySnapshot.docs)

        // Check if any documents are found
        if (querySnapshot.empty) {
            console.log("No documents found in 'inventory' collection.");
            return [];
        }

        // Map over each document to get its data
        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("Fetched items from inventory:", items);
        return items;
    } catch (error) {
        console.error("Error fetching inventory items:", error);
        return [];
    }
};

/*
    Fetches specific markers from the 'inventory' collection

    @returns Array of marker items from inventory
*/
export const getMarker = async () => {
    try {
        console.log("Attempting to fetch markers from the 'inventory' collection...");

        // Reference to the 'inventory' collection
        const inventoryRef = collection(fireDb, 'inventory');

        // Query for documents with "marker" in a specific field
        const markerQuery = query(inventoryRef, where("type", "==", "marker"));
        const querySnapshot = await getDocs(markerQuery);

        // Check if any documents are found
        if (querySnapshot.empty) {
            console.log("No markers found in 'inventory' collection.");
            return [];
        }

        // Map over each document to get its data
        const markers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("Fetched markers:", markers);
        return markers;
    } catch (error) {
        console.error("Error fetching markers:", error);
        throw error;
    }
};
