// addCustomer.js
import { fireDb } from "./initializeFirebase.js";
import { doc, setDoc, collection } from "firebase/firestore";

export const addCustomer = async (name, email, phone, location, notes, totalOrders, completedOrders) => {
    try {
        // Check if required fields are filled
        if (!name || !email || !phone || !location) {
            return 'Empty';
        }

        // Create a new document in the "customers" collection with an auto-generated ID
        const customerRef = doc(collection(fireDb, "customers"));

        // Set customer details in Firestore
        await setDoc(customerRef, {
            name,
            email,
            phone,
            location,
            notes,
            totalOrders: parseInt(totalOrders) || 0,
            completedOrders: parseInt(completedOrders) || 0,
            addedAt: new Date(),
        });

        console.log("Customer added successfully:", name);
        return true;
    } catch (error) {
        console.error("Error adding customer:", error.message);
        return error.message;
    }
};
