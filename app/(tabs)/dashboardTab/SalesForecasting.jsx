import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from "react-native";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import { forecastDemand } from "../../firebase/forecastDemand.js";
import { BarChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";

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

  const renderForecastCard = (item) => {
    const chartData = {
      labels: ["Inventory", "Forecast"],
      datasets: [
        {
          data: [item.currentInventory, item.forecastedDemand],
        },
      ],
    };

    return (
      <Card style={styles.card} key={item.id}>
        <View style={styles.cardContent}>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            {item.name} ({item.category})
          </Text>
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width * 0.8} // Responsive width
            height={220}
            fromZero
            chartConfig={{
              backgroundColor: colors.surface,
              backgroundGradientFrom: colors.surface,
              backgroundGradientTo: colors.surface,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(67, 160, 71, ${opacity})`, // Green bars
              labelColor: (opacity = 1) => colors.onSurfaceVariant,
              barPercentage: 0.5,
            }}
            style={styles.chart}
          />
          <View style={styles.info}>
            <Text style={[styles.infoText, { color: colors.onSurface }]}>
              <Text style={styles.bold}>Current Inventory:</Text> {item.currentInventory}
            </Text>
            <Text style={[styles.infoText, { color: colors.onSurface }]}>
              <Text style={styles.bold}>Forecasted Demand:</Text> {item.forecastedDemand}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <BackDrop title="Sales Forecasting" mainHeader={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.mainTitle, { color: colors.onBackground }]}>
          Forecasted Sales
        </Text>
        {isLoading ? (
          <Text style={[styles.loading, { color: colors.onBackground }]}>
            Loading...
          </Text>
        ) : (
          forecastedData.map((item) => renderForecastCard(item))
        )}
      </ScrollView>
    </BackDrop>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  info: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default SalesForecasting;
