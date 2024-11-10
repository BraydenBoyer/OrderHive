// tabs/dashboardTab/OrderAssembly.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;

const orders = [
  { id: '1', name: 'Barry Allen', date: '10/3/24', items: ['Item 1', 'Item 2', 'Item 3'] },
  { id: '2', name: 'Allen Barry', date: '10/9/24', items: ['Item 4', 'Item 5', 'Item 6'] },
  { id: '3', name: 'Aarry Ballen', date: '10/7/24', items: ['Item 7', 'Item 8', 'Item 9'] },
];

const OrderAssembly = () => {
  const [viewedOrder, setViewedOrder] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [completedCount, setCompletedCount] = useState(0);

  const handleViewItems = (orderId) => {
    setViewedOrder(orderId === viewedOrder ? null : orderId);
  };

  const handleToggleCheckbox = (orderId, item) => {
    const currentOrder = completedItems[orderId] || [];
    const isCompleted = currentOrder.includes(item);

    const updatedOrder = isCompleted
      ? currentOrder.filter((i) => i !== item)
      : [...currentOrder, item];

    setCompletedItems((prev) => ({ ...prev, [orderId]: updatedOrder }));

    setCompletedCount((prevCount) => {
      if (isCompleted) {
        return prevCount > 0 ? prevCount - 1 : 0;
      } else {
        const totalItems = orders.reduce((acc, order) => acc + order.items.length, 0);
        return prevCount < totalItems ? prevCount + 1 : prevCount;
      }
    });
  };

  const renderItems = (order) => (
    <FlatList
      data={order.items}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <Checkbox
            status={completedItems[order.id]?.includes(item) ? 'checked' : 'unchecked'}
            onPress={() => handleToggleCheckbox(order.id, item)}
          />
          <Text
            style={[
              styles.itemText,
              completedItems[order.id]?.includes(item) && styles.itemCompletedText,
            ]}
          >
            {item}
          </Text>
        </View>
      )}
    />
  );

  return (
    <BackDrop title="Order Assembly" mainHeader={false}>
      {/* Order List */}
      {orders.map((order) => (
        <Card key={order.id} style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.cardContent}>
            <View style={styles.leftSection}>
              <Checkbox
                status={
                  completedItems[order.id]?.length === order.items.length ? 'checked' : 'unchecked'
                }
                onPress={() => order.items.forEach((item) => handleToggleCheckbox(order.id, item))}
              />
              <View>
                <Text style={[styles.orderName, { color: colors.onSurface }]}>{order.name}</Text>
                <Text style={[styles.orderDetails, { color: colors.onSurfaceVariant }]}>
                  {order.date} • {order.items.length} items
                </Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.viewButton, { backgroundColor: colors.primary }]} onPress={() => handleViewItems(order.id)}>
              <Text style={[styles.viewButtonText, { color: colors.onPrimary }]}>View Items</Text>
            </TouchableOpacity>
          </View>
          {viewedOrder === order.id && (
            <View style={styles.itemList}>
              {renderItems(order)}
            </View>
          )}
        </Card>
      ))}

      <View style={[styles.completedBox, { backgroundColor: colors.primaryContainer }]}>
        <Text style={[styles.completedText, { color: colors.onPrimaryContainer }]}>Completed</Text>
        <Text style={[styles.completedCounter, { color: colors.onPrimaryContainer }]}>
          {completedCount}/{orders.reduce((acc, order) => acc + order.items.length, 0)}
        </Text>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDetails: {
    fontSize: 14,
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
  itemList: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
  },
  itemCompletedText: {
    textDecorationLine: 'line-through',
    color: colors.outline,
  },
  completedBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  completedText: {
    fontSize: 14,
    textAlign: 'center',
  },
  completedCounter: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderAssembly;
