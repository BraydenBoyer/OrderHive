// tabs/dashboardTab/OrderDetails.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";

const OrderDetails = ({ route }) => {
  const { order } = route.params;

  const calculateTotalCost = () => {
    return order.items.length * order.costPerItem;
  };

  const calculateTotalSellingPrice = () => {
    return order.items.length * order.sellingPricePerItem;
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.value}>{order.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Number of Items:</Text>
          <Text style={styles.value}>{order.items.length}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total Cost:</Text>
          <Text style={styles.value}>${calculateTotalCost()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total Selling Price:</Text>
          <Text style={styles.value}>${calculateTotalSellingPrice()}</Text>
        </View>
        <Text style={styles.sectionHeader}>Item Details</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemDetail}>
            <Text style={styles.itemText}>Item {index + 1} - Cost: ${order.costPerItem}, Selling Price: ${order.sellingPricePerItem}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightTheme.colors.background,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: lightTheme.colors.surface,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    color: lightTheme.colors.onSurface,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  itemDetail: {
    marginTop: 5,
  },
  itemText: {
    fontSize: 14,
    color: lightTheme.colors.onSurface,
  },
});

export default OrderDetails;
