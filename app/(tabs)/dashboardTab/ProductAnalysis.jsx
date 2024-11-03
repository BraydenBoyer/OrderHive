// tabs/dashboardTab/ProductAnalysis.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";

const ProductAnalysis = () => {
  const [viewedChart, setViewedChart] = useState(null);

  const handleViewPress = (chartType) => {
    setViewedChart(chartType === viewedChart ? null : chartType);
  };

  const renderChart = () => {
    const chartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        },
      ],
    };

    return (
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width * 0.9} // Width of chart
        height={220}
        chartConfig={{
          backgroundColor: "#f3e8ff",
          backgroundGradientFrom: "#f3e8ff",
          backgroundGradientTo: "#a685e2",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    );
  };

  return (
    <BackDrop title="Product Analysis" mainHeader={false}>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.cardTitle}>Most Popular Products</Text>
            <Text style={styles.cardSubtitle}>Most Popular | Watermelon</Text>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => handleViewPress("popular")}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "popular" && renderChart()}
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.cardTitle}>Unpopular Products</Text>
            <Text style={styles.cardSubtitle}>Least Popular | Cabbage</Text>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => handleViewPress("unpopular")}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "unpopular" && renderChart()}
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.cardTitle}>Product Profitability</Text>
            <Text style={styles.cardSubtitle}>Most Profitable | Eggs</Text>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => handleViewPress("profitability")}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "profitability" && renderChart()}
      </Card>
    </BackDrop>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f3e8ff', 
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6e6e6e',
    marginTop: 5,
  },
  viewButton: {
    backgroundColor: '#a685e2', 
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductAnalysis;
