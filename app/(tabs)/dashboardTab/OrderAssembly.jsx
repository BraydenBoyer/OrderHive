// tabs/dashboardTab/OrderAssembly.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import ActionButton from '../../../components/ActionButton'; 
import SettingsButton from '../../../components/SettingsButton';

const orders = [
  { id: '1', name: 'Barry Allen', date: '10/3/24', items: 10 },
  { id: '2', name: 'Allen Barry', date: '10/9/24', items: 14 },
  { id: '3', name: 'Aarry Ballen', date: '10/7/24', items: 18 },
];

const OrderAssembly = () => {
  return (
    <View style={styles.container}>
      <SettingsButton />
      <Text style={styles.title}>Order Assembly</Text>

      {/* Order List */}
      {orders.map((order) => (
        <Card key={order.id} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.leftSection}>
              <Checkbox status="unchecked" />
              <View>
                <Text style={styles.orderName}>{order.name}</Text>
                <Text style={styles.orderDetails}>{order.date} • {order.items} items</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Items</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      <ActionButton />
      <View style={styles.completedBox}>
        <Text style={styles.completedText}>Completed</Text>
        <Text style={styles.completedCounter}>0/3</Text>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDetails: {
    fontSize: 14,
    color: '#6e6e6e',
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
  completedBox: {
    position: 'absolute',
    bottom: 20, 
    left: 20,   
    backgroundColor: '#a685e2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  completedCounter: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderAssembly;
