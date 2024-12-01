import { collection, getDocs } from 'firebase/firestore';
import { fireDb } from './initializeFirebase'; // Adjust the import path as needed

/**
 * Fetch the total number of users in the Firebase Firestore "users" collection.
 * @returns {Promise<number>} The count of users in the Firestore.
 */
export const fetchUsers = async () => {
  try {
    const usersCollection = collection(fireDb, 'users'); // Replace 'users' with the actual collection name
    const snapshot = await getDocs(usersCollection);
    return snapshot.size; // Returns the number of documents in the collection
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch user data.');
  }
};
