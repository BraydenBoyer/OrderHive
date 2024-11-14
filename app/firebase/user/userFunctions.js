import { fireApp, fireAuth, fireDb } from "../initializeFirebase.js";
import { createUserWithEmailAndPassword , updateEmail,updatePassword,getAuth} from "firebase/auth";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {useState} from "react";


/*
	Creates a new user. Returns error info if it fails.

	@author Miles Hoffman
 */
export const createUser = async (email, password, name, phone) => {

	try {
		// Check if the fields are filled in.
		if (!email || !password || !name || !phone) {
			return 'Empty'
		}

		// 1. Create the user account in Firebase Authentication
		const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password)
		const user = userCredential.user

		// 2. Create a user document in Firestore
		const userRef = doc(fireDb, 'users', user.uid) // Use user's UID for document ID
		await setDoc(userRef, {
			name: name,
			email: email,
			userID: user.uid,
			phone: phone,
		})

		console.log("User created successfully:", `User.${name}.` + user.uid)
		return true
	}
	catch (error) {
		console.log("Error creating user:", error.code)
		return error.code
	}
};



/*
	Retrieves the current user's information. User must be authenticated first.

	@author Miles Hoffman
 */
export const getCurrentUserInfo = async () => {

	const docRef = doc(fireDb, "users", fireAuth.currentUser.uid);
	const docSnap = await getDoc(docRef);

	return docSnap.data()
}


/*
	Checks to see if the user belongs to an organization

	@author Miles Hoffman
 */
export async function userHasOrg(){

	const userData = await getCurrentUserInfo()

	return userData.hasOwnProperty('organizations');
}



/*
	Add the current user to an org

	@author Miles
 */
export const addOrgToUser = async (orgName, role) => {

	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID

	const userRef = doc(fireDb, `users`, userID)

	const update = {
		organizations: {
			['Org.' + orgName]: {
				role: role
			}
		}
	}

	await updateDoc( userRef, update )
}

/*
	function to allow users to change their username

	@author Brayden
 */
export const updateUserUsername = async (username) => {
	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID
	const userRef = doc(fireDb, `users`, userID)
	const update = {
		name: username
	}
	await updateDoc(userRef, update )
}
/*
	function to allow users to change their phone number

	@author Brayden
 */
export const updateUserPhoneNumber = async (phone_number) => {
	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID
	const phoneRef = doc(fireDb, `users`, userID)
	const update = {
		phone: phone_number
	}
	await updateDoc(phoneRef, update )
}

/*
	function to allow users to change their password

	@author Brayden
 */
export const updateUserPassword = async (password) => {
	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID
	const passRef = doc(fireDb, `users`, userID)
	const update = {
		password: password
	}
	await updateDoc(passRef, update )
}
/*
	function to allow users to change their email

	@author Brayden
 */
export const updateUserEmail = async (email) => {

	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID
	const EmailRef = doc(fireDb, `users`, userID)
	const update = {
		email: email
	}
	await updateDoc( EmailRef,update )


	const auth = await getAuth()
	const user = auth.currentUser


	await updateEmail(user, email)


}
