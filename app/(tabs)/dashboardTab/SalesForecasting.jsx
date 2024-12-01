import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import { forecastDemand } from "../../firebase/forecastDemand.js";

const colors = lightTheme.colors;

const SalesForecasting = () => {
  const [forecastedData, setForecastedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchForecast = async () => {
    setIsLoading(true);
    try {
      const data = await forecastDemand();
      setForecastedData(data);
      Alert.alert("Forecast Loaded", "Sales forecast data has been updated.");
    } catch (error) {
      console.error("Error fetching forecast:", error);
      Alert.alert("Error", "Failed to fetch forecast data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: colors.surface }]}>
      <Text style={[styles.itemText, { color: colors.onSurface }]}>
        <Text style={styles.bold}>Product:</Text> {item.name}
      </Text>
      <Text style={[styles.itemText, { color: colors.onSurface }]}>
        <Text style={styles.bold}>Category:</Text> {item.category}
      </Text>
      <Text style={[styles.itemText, { color: colors.onSurface }]}>
        <Text style={styles.bold}>Current Inventory:</Text> {item.currentInventory}
      </Text>
      <Text style={[styles.itemText, { color: colors.onSurface }]}>
        <Text style={styles.bold}>Forecasted Demand:</Text> {item.forecastedDemand}
      </Text>
    </View>
  );

  return (
    <BackDrop title="Sales Forecasting" mainHeader={false}>
      <Text style={[styles.title, { color: colors.onBackground }]}>
        Forecasted Sales
      </Text>
      {isLoading ? (
        <Text style={[styles.loading, { color: colors.onBackground }]}>Loading...</Text>
      ) : (
        <FlatList
          data={forecastedData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </BackDrop>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default SalesForecasting;
