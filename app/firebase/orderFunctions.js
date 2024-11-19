import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { fireDb } from './initializeFirebase'; // Import initialized Firestore

// Function to add a new order
export const addOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(fireDb, 'orders'), order);
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error('Error adding order: ', error);
    throw new Error('Failed to add order');
  }
};

// Function to fetch all orders
export const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(fireDb, 'orders'));
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders: ', error);
    throw new Error('Failed to fetch orders');
  }
};

// Function to update an order
export const updateOrder = async (orderId, updatedOrder) => {
  try {
    const orderRef = doc(fireDb, 'orders', orderId);
    await updateDoc(orderRef, updatedOrder);
    return { id: orderId, ...updatedOrder };
  } catch (error) {
    console.error('Error updating order: ', error);
    throw new Error('Failed to update order');
  }
};

// Function to delete an order
export const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(fireDb, 'orders', orderId));
    return orderId;
  } catch (error) {
    console.error('Error deleting order: ', error);
    throw new Error('Failed to delete order');
  }
};
