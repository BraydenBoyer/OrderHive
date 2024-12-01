import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjbfto-gWX06abtD8LeUA6fMS_YpqC72U",
  authDomain: "orderhive-e4d46.firebaseapp.com",
  projectId: "orderhive-e4d46",
  storageBucket: "orderhive-e4d46.firebasestorage.app",
  messagingSenderId: "185090084201",
  appId: "1:185090084201:web:1a209a03d8635d9bcbc1f8",
  measurementId: "G-S4CHV3FQ7Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// JSON Data (or load it from a file)
const syntheticData = [
  {
    name: "Apples",
    category: "Fruits",
    monthlyData: [
      { month: "2023-01", hold: 20, total: 100 },
      { month: "2023-02", hold: 25, total: 90 },
      { month: "2023-03", hold: 30, total: 85 },
      { month: "2023-04", hold: 28, total: 80 },
      { month: "2023-05", hold: 32, total: 75 },
      { month: "2023-06", hold: 35, total: 70 },
      { month: "2023-07", hold: 40, total: 65 },
      { month: "2023-08", hold: 38, total: 60 },
      { month: "2023-09", hold: 42, total: 55 },
      { month: "2023-10", hold: 45, total: 50 },
    ],
  },
  {
    name: "Bread",
    category: "Bakery",
    monthlyData: [
      { month: "2023-01", hold: 15, total: 50 },
      { month: "2023-02", hold: 20, total: 45 },
      { month: "2023-03", hold: 18, total: 40 },
      { month: "2023-04", hold: 22, total: 35 },
      { month: "2023-05", hold: 25, total: 30 },
      { month: "2023-06", hold: 20, total: 25 },
      { month: "2023-07", hold: 18, total: 20 },
      { month: "2023-08", hold: 15, total: 15 },
      { month: "2023-09", hold: 12, total: 10 },
      { month: "2023-10", hold: 10, total: 5 },
    ],
  },
  {
    name: "Milk",
    category: "Dairy",
    monthlyData: [
      { month: "2023-01", hold: 30, total: 150 },
      { month: "2023-02", hold: 35, total: 140 },
      { month: "2023-03", hold: 40, total: 130 },
      { month: "2023-04", hold: 38, total: 120 },
      { month: "2023-05", hold: 45, total: 110 },
      { month: "2023-06", hold: 42, total: 100 },
      { month: "2023-07", hold: 48, total: 90 },
      { month: "2023-08", hold: 50, total: 80 },
      { month: "2023-09", hold: 55, total: 70 },
      { month: "2023-10", hold: 60, total: 60 },
    ],
  },
];

// Function to import the data
const importData = async () => {
  try {
    const inventoryRef = collection(db, "inventory");

    for (const product of syntheticData) {
      const productRef = await addDoc(inventoryRef, {
        name: product.name,
        category: product.category,
      });

      // Add monthly data as a sub-collection
      const monthlyDataRef = collection(productRef, "monthlyData");
      for (const monthData of product.monthlyData) {
        await addDoc(monthlyDataRef, monthData);
      }

      console.log(`Imported data for product: ${product.name}`);
    }

    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
};

// Run the import function
importData();
