import {getAuth, signInWithEmailAndPassword, signOut,updatePassword,updateEmail,verifyBeforeUpdateEmail} from 'firebase/auth'
import {fireApp, fireAuth, fireDb} from "../initializeFirebase.js";
import {doc, updateDoc} from "firebase/firestore";
import {getCurrentUserInfo} from "./userFunctions.js";




export const emailLogin = async (email, password, setErrorCode) => {

	try {
		const userCreds = await signInWithEmailAndPassword(fireAuth, email, password)
		const user = userCreds.user

		console.log(user.email, ' has logged in.')
		setErrorCode('0')
	}
	catch (error) {
		console.log("Login error code:", error.code);
		setErrorCode(error.code)
	}
}


export const logoutCurrentUser = async () => {

	await signOut(fireAuth)
	console.log("Current user was signed out.")
}

export const updateUserPassword = async (password) => {
	const user = fireAuth.currentUser
	await updatePassword(user, password)
	console.log('2')
	const userRef = doc(fireDb, "users", fireAuth.currentUser.uid)
	console.log('3')
	const update = {
		password: password
	}
	await updateDoc(userRef,update)
	console.log('Done')
}


export const updateUserEmail = async (email) => {
	try {
		const user = fireAuth.currentUser;

		// Initiate email update and verification
		await verifyBeforeUpdateEmail(user, email);

		// const userRef = doc(fireDb, "users", user.uid);
		// await updateDoc(userRef, { email: email });

		console.log("Verification email sent. Please verify to update your email.");

	} catch (error) {
		console.error("Error initiating email update:", error);
	}
}
