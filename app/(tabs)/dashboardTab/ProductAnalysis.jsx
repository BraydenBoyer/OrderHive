// tabs/dashboardTab/ProductAnalysis.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;

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
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        },
      ],
    };

    return (
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width * 0.9}
        height={220}
        chartConfig={{
          backgroundColor: colors.surface,
          backgroundGradientFrom: colors.surface,
          backgroundGradientTo: colors.primaryContainer,
          decimalPlaces: 0,
          color: (opacity = 1) => colors.onSurface,
          labelColor: (opacity = 1) => colors.onSurfaceVariant,
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
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Most Popular Products</Text>
            <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>
              Most Popular | Watermelon
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.viewButton, { backgroundColor: colors.primary }]}
            onPress={() => handleViewPress("popular")}
          >
            <Text style={[styles.viewButtonText, { color: colors.onPrimary }]}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "popular" && renderChart()}
      </Card>

      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Unpopular Products</Text>
            <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>
              Least Popular | Cabbage
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.viewButton, { backgroundColor: colors.primary }]}
            onPress={() => handleViewPress("unpopular")}
          >
            <Text style={[styles.viewButtonText, { color: colors.onPrimary }]}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "unpopular" && renderChart()}
      </Card>

      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Product Profitability</Text>
            <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>
              Most Profitable | Eggs
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.viewButton, { backgroundColor: colors.primary }]}
            onPress={() => handleViewPress("profitability")}
          >
            <Text style={[styles.viewButtonText, { color: colors.onPrimary }]}>View</Text>
          </TouchableOpacity>
        </View>
        {viewedChart === "profitability" && renderChart()}
      </Card>
    </BackDrop>
  );
};

const styles = StyleSheet.create({
  card: {
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
    marginTop: 5,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductAnalysis;
