import { fireDb } from "./initializeFirebase.js";
import { doc, setDoc, collection } from "firebase/firestore";

export const addInventoryItem = async (category, name, price, total, hold, source, ) => {
    try {
        //check if fields are filled
        if (!category || !name || !price || !total || !hold || !source  ) {
            return 'Empty';
        }


        const categoryRef = doc(fireDb, 'inventory', category);

        //create a reference for the item within the category
        const itemRef = doc(collection(categoryRef, 'items'), name);

        //set the item details in Firestore under the category
        await setDoc(itemRef, {
            name: name,
            total: total,
            hold: hold,
            addedAt: new Date(),
            source: source,
        });

        console.log("Item added successfully:", name, "under category:", category, "at company ", source);
        return true;
    }
    catch (error) {
        console.log("Error adding item to inventory:", error.code);
        return error.code;
    }
};
