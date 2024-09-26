import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyB9t9udaC6vu8JXg-cf02ShsAAATDsP1g0",
    authDomain: "testfire-b2a5e.firebaseapp.com",
    projectId: "testfire-b2a5e",
    storageBucket: "testfire-b2a5e.appspot.com",
    messagingSenderId: "",
    appId: "",
};


const app = initializeApp(firebaseConfig);


const database = getDatabase(app);


function sendStringToDatabase() {
    // Reference to the location in the database where you want to store data
    const dbRef = ref(database, 'test-string');

    // Write a string to the database
    set(dbRef, 'This is a test string')
        .then(() => {
            console.log('Data successfully written!');
        })
        .catch((error) => {
            console.error('Error writing data: ', error);
        });
}


sendStringToDatabase();
