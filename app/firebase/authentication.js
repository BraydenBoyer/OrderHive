import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {fireApp, fireAuth} from "./initializeFirebase.js";




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