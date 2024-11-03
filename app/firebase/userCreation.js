import { fireApp, fireAuth, fireDb } from "./initializeFirebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


export const userCreation = async (email, password, name, phone) => {




	try {
		// Check if the fields are filled in.
		if (!email || !password || !name || !phone) {
			return 'Empty'
		}

		// 1. Create the user account in Firebase Authentication
		const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password)
		const user = userCredential.user

		// 2. Create a user document in Firestore
		const userRef = doc(fireDb, 'users', `User.${name}.` + user.uid) // Use user's UID for document ID
		await setDoc(userRef, {
			name: name,
			email: email,
			id: user.uid,
			phone: phone
		})

		console.log("User created successfully:", `User.${name}.` + user.uid)
		return true
	}
	catch (error) {
		console.log("Error creating user:", error.code)
		return error.code
	}
};