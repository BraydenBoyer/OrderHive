// tabs/dashboardTab/ProductAnalysis.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import ActionButton from '../../../components/ActionButton';
import SettingsButton from '../../../components/SettingsButton';

const ProductAnalysis = () => {
  return (
    <View style={styles.container}>
      <SettingsButton />
      <Text style={styles.title}>Product Analysis</Text>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.cardTitle}>Most Popular Products</Text>
            <Text style={styles.cardSubtitle}>Most Popular | Watermelon</Text>
          </View>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.cardTitle}>Unpopular Products</Text>
            <Text style={styles.cardSubtitle}>Least Popular | Cabbage</Text>
          </View>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Text style={styles.cardTitle}>Product Profitability</Text>
            <Text style={styles.cardSubtitle}>Most Profitable | Eggs</Text>
          </View>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </Card>
       <ActionButton />
    </View>
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
