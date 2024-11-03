import {getDoc, collection, doc} from 'firebase/firestore'
import {fireDb} from "./initializeFirebase.js";

const getItems = async () => {

    const docRef = doc(fireDb, "users", "User.Miles.HlmTkj5HH7Q9SARyU8PyQKk4fWF2");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}