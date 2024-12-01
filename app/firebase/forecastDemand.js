import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { fireDb } from "./initializeFirebase"; // Adjust path if needed

/**
 * Forecast future demand for all products with valid document IDs.
 * @returns {Promise<Array>} Forecasted data for products with "weird" IDs.
 */
export const forecastDemand = async () => {
  try {
    const inventoryRef = collection(fireDb, "inventory");
    const inventorySnapshot = await getDocs(inventoryRef);

    const forecasts = [];

    // Process only documents with sub-collection `monthlyData`
    for (const productDoc of inventorySnapshot.docs) {
      const productData = productDoc.data();
      const monthlyDataRef = collection(productDoc.ref, "monthlyData");

      // Fetch `monthlyData` sub-collection, ordered by month
      const monthlyDataQuery = query(monthlyDataRef, orderBy("month"));
      const monthlyDataSnapshot = await getDocs(monthlyDataQuery);

      const monthlyData = monthlyDataSnapshot.docs.map((doc) => doc.data());

      // Ensure we have enough data to forecast
      if (monthlyData.length < 3) {
        console.warn(`Not enough data to forecast for product: ${productData.name}`);
        continue;
      }

      // Calculate average hold over the past months
      const totalHold = monthlyData.reduce((sum, data) => sum + data.hold, 0);
      const averageHold = totalHold / monthlyData.length;

      // Apply a growth factor (optional)
      const growthFactor = 1.1; // 10% growth
      const forecastedDemand = Math.ceil(averageHold * growthFactor);

      forecasts.push({
        id: productDoc.id,
        name: productData.name,
        category: productData.category,
        currentInventory: monthlyData[monthlyData.length - 1].total,
        forecastedDemand,
      });
    }

    return forecasts;
  } catch (error) {
    console.error("Error forecasting demand:", error);
    throw new Error("Failed to forecast demand.");
  }
};
