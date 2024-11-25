import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import { fetchCountryOrders } from "../../firebase/fetchCountryOrders.js";
import { fetchInventoryData } from "../../firebase/fetchInventoryData.js";

const colors = lightTheme.colors;

const ProductAnalysis = () => {
  const [viewedChart, setViewedChart] = useState(null);
  const [countryOrders, setCountryOrders] = useState({});
  const [inventoryData, setInventoryData] = useState({});

  // Fetch total orders by country
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await fetchCountryOrders();
        setCountryOrders(orders);
      } catch (error) {
        console.error('Error fetching country orders:', error);
        Alert.alert('Error', 'Failed to load orders by country.');
      }
    };

    fetchOrders();
  }, []);

  // Fetch inventory data
  useEffect(() => {
    const loadInventoryData = async () => {
      try {
        const data = await fetchInventoryData();
        setInventoryData(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        Alert.alert('Error', 'Failed to load inventory data.');
      }
    };

    loadInventoryData();
  }, []);

  // Render Bar Chart for Orders by Country
  const renderCountryOrdersChart = () => {
    const countries = Object.keys(countryOrders);
    const orders = Object.values(countryOrders);

    const chartData = {
      labels: countries,
      datasets: [
        {
          data: orders,
          color: (opacity = 1) => `rgba(67, 160, 71, ${opacity})`, // Green bars for better contrast
        },
      ],
    };

    return (
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width * 0.9}
        height={260} // Increased height for better display
        fromZero
        showBarTops={false}
        showValuesOnTopOfBars={true} // Display values on top of bars
        chartConfig={{
          backgroundColor: colors.surface,
          backgroundGradientFrom: colors.primaryContainer,
          backgroundGradientTo: colors.surface,
          decimalPlaces: 0, // Rounded values for clarity
          barPercentage: 0.7, // Reduced width for better spacing
          color: (opacity = 1) => `rgba(0, 77, 255, ${opacity})`, // Blue bars
          labelColor: (opacity = 1) => colors.onSurfaceVariant,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 16,
          borderRadius: 20,
          elevation: 4, // Shadow for better depth
        }}
      />
    );
  };

  // Render Bar Chart for Inventory
  const renderInventoryChart = () => {
    const labels = Object.keys(inventoryData); // Inventory item names
    const data = Object.values(inventoryData); // Counts for each item

    const chartData = {
      labels,
      datasets: [
        {
          data,
          color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`, // Pink bars for variety
        },
      ],
    };

    return (
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width * 0.9}
        height={260} // Increased height for better display
        fromZero
        showBarTops={false}
        showValuesOnTopOfBars={true} // Display values on top of bars
        chartConfig={{
          backgroundColor: colors.surface,
          backgroundGradientFrom: colors.primaryContainer,
          backgroundGradientTo: colors.surface,
          decimalPlaces: 0, // Rounded values for clarity
          barPercentage: 0.7, // Reduced width for better spacing
          color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`, // Orange bars
          labelColor: (opacity = 1) => colors.onSurfaceVariant,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 16,
          borderRadius: 20,
          elevation: 4, // Shadow for better depth
        }}
      />
    );
  };

  const handleViewPress = (chartType) => {
    setViewedChart(chartType === viewedChart ? null : chartType);
  };

  return (
    <BackDrop title="Product Analysis" mainHeader={false}>
      {/* Card for Orders by Country */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Orders by Country</Text>
            <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>
              Total Orders
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.viewButton, { backgroundColor: colors.primary }]}
            onPress={() => handleViewPress("countryOrders")}
          >
            <Text style={[styles.viewButtonText, { color: colors.onPrimary }]}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "countryOrders" && renderCountryOrdersChart()}
      </Card>

      {/* Card for Inventory Data */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Inventory Data</Text>
            <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>
              Histogram of Inventory Items
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.viewButton, { backgroundColor: colors.primary }]}
            onPress={() => handleViewPress("inventory")}
          >
            <Text style={[styles.viewButtonText, { color: colors.onPrimary }]}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "inventory" && renderInventoryChart()}
      </Card>
    </BackDrop>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000", // Shadow for better depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  leftSection: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  viewButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductAnalysis;
