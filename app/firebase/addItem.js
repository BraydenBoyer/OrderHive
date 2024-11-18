import { fireDb } from "./initializeFirebase.js";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import {globalVariable} from '../_layout.jsx'

export const addInventoryItem = async (category, name, price, total, hold, source) => {
    try {
        // Check if required fields are filled
        if (!category || !name || !price || !total || !hold || !source) {
            return 'Empty';
        }

        const orgName = "Org." + globalVariable.currentOrg
        // Reference to the category document
        const categoryRef = doc(fireDb, 'organizations/${orgName}/inventory', category);

        // Check if the category document already exists
        const categorySnapshot = await getDoc(categoryRef);
        if (!categorySnapshot.exists()) {
            // If the category doesn't exist, create it and add a field with the category name
            await setDoc(categoryRef, { name: category });
            console.log("Created new category with field name:", category);
        }

        // Reference to the item within the category's 'items' subcollection
        const itemRef = doc(collection(categoryRef, 'items'), name);

        // Set the item details in Firestore under the category's items subcollection
        await setDoc(itemRef, {
            name: name,
            category: category, // Include category for easier filtering later
            price: price,
            total: total,
            hold: hold,
            addedAt: new Date(),
            source: source,
        });

        console.log("Item added successfully:", name, "under category:", category, "at company", source);
        return true;
    } catch (error) {
        console.log("Error adding item to inventory:", error.code);
        return error.code;
    }
};
