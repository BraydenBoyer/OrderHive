import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
	try {
		// Attempt to fetch a document (replace 'yourCollection' and 'yourDocumentId')
		const docRef = doc(db, 'Testing', 'TestDoc');
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Connected to Firebase! Document data:", docSnap.data());
		} else {
			console.log("Connected to Firebase, but document does not exist.");
		}
	} catch (error) {
		console.error("Error connecting to Firebase:", error);
	}
}

//testConnection();