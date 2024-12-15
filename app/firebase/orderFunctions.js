import {collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc, getDoc, query, where} from 'firebase/firestore';
import { fireDb } from './initializeFirebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {globalVariable} from "../_layout.jsx"; // Import initialized Firestore

// Function to add a new order
export const addOrder = async (customerName, notes, totalCost, itemNameArr) => {

  const currOrg = 'Org.' + globalVariable.currentOrg
  const order = {
    customer: customerName,
    notes: notes,
    totalCost: totalCost
  }

  try {
    const docRef = await addDoc(collection(fireDb, `orders`), order);

  } catch (error) {
    console.error('Error adding order: ', error);
    throw new Error('Failed to add order');
  }
};


export const createOrder = async (orderData) => {
  const currOrg = 'Org.' + globalVariable.currentOrg;
  const orderId = uuidv4(); // Generate the UUID

  let totalItems = 0;
  orderData.items.forEach(item => {
    totalItems += parseInt(item.quantity, 10); // Parse quantity as integer
  });

  const order = {
    customer: orderData.customerName,
    notes: orderData.notes,
    totalCost: orderData.totalCost,
    items: orderData.items,
    id: orderId,
    totalItems: totalItems, // Use the calculated totalItems
    done: false
  };


  try {
    // Use doc() to create a DocumentReference with the custom ID
    const orderRef = doc(collection(fireDb, `organizations/${currOrg}/orders`), orderId);
    await setDoc(orderRef, order);

    for (const item of orderData.items) {
      try {
        const itemId = uuidv4(); // Generate UUID for each item
        const itemRef = doc(collection(orderRef, 'items'), itemId);
        const itemData = {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        };
        await setDoc(itemRef, itemData);
        console.log(`Item ${item.name} created in order ${orderId}`);
      } catch (itemError) {
        console.error(`Error creating item ${item.name} in order ${orderId}:`, itemError);
      }
    }

    console.log('Order created with ID: ', orderId);
  } catch (error) {
    console.error('Error adding order: ', error);
    throw new Error('Failed to add order');
  }
};



// Function to fetch all orders
export const fetchOrders = async () => {

  const currOrg = 'Org.' + globalVariable.currentOrg

  try {
    const querySnapshot = await getDocs(collection(fireDb, `organizations/${currOrg}/orders`));
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders: ', error);
    throw new Error('Failed to fetch orders');
  }
};


export const fetchAllInventoryItems = async () => {
  try {
    const orgName = "Org." + globalVariable.currentOrg;
    const inventoryRef = collection(fireDb, `organizations/${orgName}/inventory`);
    const inventorySnapshot = await getDocs(inventoryRef);
    const allItems = [];

    for (const categoryDoc of inventorySnapshot.docs) {
      const categoryName = categoryDoc.id;
      const itemsRef = collection(fireDb, `organizations/${orgName}/inventory/${categoryName}/items`);
      const itemsSnapshot = await getDocs(itemsRef);

      itemsSnapshot.forEach((itemDoc) => {
        allItems.push({ id: itemDoc.id, category: categoryName, ...itemDoc.data() }); // Include category
      });
    }

    return allItems

  } catch (error) {
    console.error("Error fetching inventory data:", error);
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



export const fetchOrderData = async (orderId) => {

  const organizationName = 'Org.' + globalVariable.currentOrg

  try {
    const orderRef = doc(fireDb, `organizations/${organizationName}/orders`, orderId);
    const orderSnapshot = await getDoc(orderRef);

    if (!orderSnapshot.exists()) {
      console.warn(`Order with ID ${orderId} not found.`);
      return null; // Or throw an error if you prefer
    }

    const orderData = orderSnapshot.data();

    // Fetch items subcollection
    const itemsCollectionRef = collection(orderRef, 'items');
    const itemsSnapshot = await getDocs(itemsCollectionRef);
    const items = [];

    itemsSnapshot.forEach(itemDoc => {
      items.push({ id: itemDoc.id, ...itemDoc.data() });
    });

    const result = { ...orderData, items }
    console.log('Fetched order data: ', result)
    return result // Return order data with items

  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw error; // Re-throw the error for handling by the caller
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {

  const currOrg = 'Org.' + globalVariable.currentOrg

  try {
    const orderRef = doc(fireDb, `organizations/${currOrg}/orders`, orderId);
    await updateDoc(orderRef, { done: newStatus }); // Update 'done' field
    console.log("updated order status")

  } catch (error) {
    console.error('Error updating order status: ', error);
    throw new Error('Failed to update order status');
  }
};


export const deleteFinishedOrders = async () => {

  const orgName = 'Org.' + globalVariable.currentOrg; // Get current organization name

  try {
    // Create a query to find all completed orders for the organization
    const q = query(collection(fireDb, `organizations/${orgName}/orders`), where('done', '==', true));

    const querySnapshot = await getDocs(q);

    // Loop through each document (order) and delete it
    querySnapshot.forEach((docSnapshot) => {
      const orderRef = doc(fireDb, `organizations/${orgName}/orders`, docSnapshot.id);
      deleteDoc(orderRef);
    });

    console.log('Successfully deleted completed orders for ' + orgName);
    // Optionally, display a success message to the user
  } catch (error) {
    console.error('Error deleting completed orders:', error);
    // Handle errors, e.g., display an error message to the user
  }
}