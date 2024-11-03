import { initializeApp } from "firebase/app";
import {initializeFirestore} from 'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCjbfto-gWX06abtD8LeUA6fMS_YpqC72U",
	authDomain: "orderhive-e4d46.firebaseapp.com",
	projectId: "orderhive-e4d46",
	storageBucket: "orderhive-e4d46.firebasestorage.app",
	messagingSenderId: "185090084201",
	appId: "1:185090084201:web:1a209a03d8635d9bcbc1f8",
	measurementId: "G-S4CHV3FQ7Q"
};

// Database settings
const firestoreSettings = {
	cacheSizeBytes: 1024 * 1024 * 10, // 10MB cache
	ignoreUndefinedProperties: true,
};


// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);
console.log("Initialized Firebase")


// Initialize authentication
let auth
try{
	auth = initializeAuth(fireApp, {
		persistence: getReactNativePersistence(ReactNativeAsyncStorage)
	});
}
catch (e) { console.warn('(initializeFirebase.js) Probably saying that auth is already initialized')}
export const fireAuth = auth


// Initialize database
export const fireDb = initializeFirestore(fireApp, firestoreSettings)