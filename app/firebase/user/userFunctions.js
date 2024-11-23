import { fireApp, fireAuth, fireDb } from "../initializeFirebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";


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
			password: password
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

	const docRef = await doc(fireDb, 'users', fireAuth.currentUser.uid)
	const collectionName = 'organizations'

	const collectionRef = collection(docRef, collectionName);
	const snapshot = await getDocs(collectionRef);

	return !snapshot.empty;
}



/*
	Add the current user to an org

	@author Miles
 */
export const addOrgToUser = async (orgName, role, location) => {

	if( location === undefined ){
		location = await getUserOrgs().location

	}

	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID
	const orgID = 'Org.' + orgName

	const userRef = doc(fireDb, `users/${userID}/organizations`, orgName)

	const orgInfo = {
		name: orgName,
		role: role,
		location: location,
	}

	await setDoc( userRef, orgInfo )
}


export const getUserOrgs = async () => {

	const docRef = doc(fireDb, 'users', fireAuth.currentUser.uid)
	const collectionName = 'organizations'

	const collectionRef = collection(docRef, collectionName);
	const snapshot = await getDocs(collectionRef);

	return snapshot.docs.map(doc => doc.data());
}




export const updateUserUsername = async (name) => {
	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID
	const userRef = doc(fireDb, "users", fireAuth.currentUser.uid)
	const update = {
		name: name
	}
	await updateDoc(userRef,update)
}

export const updateUserPhone = async (phone) => {
	const userInfo = await getCurrentUserInfo()
	const userID = userInfo.userID
	const userRef = doc(fireDb, "users", fireAuth.currentUser.uid)
	const update = {
		phone: phone
	}
	await updateDoc(userRef,update)
}