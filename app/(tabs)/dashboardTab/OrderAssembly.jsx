import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Button, TextInput, Alert } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { LocalFAB } from "../../../components/overlays/LocalFAB.jsx"; // Import the LocalFAB component
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx"; 

const colors = lightTheme.colors;

let initialOrders = [
  { 
    id: '1', 
    name: 'Barry Allen', 
    date: '10/3/24', 
    items: [
      { name: 'Item 1', sellingPrice: 15, costToMake: 7 },
      { name: 'Item 2', sellingPrice: 18, costToMake: 9 },
      { name: 'Item 3', sellingPrice: 12, costToMake: 6 },
    ] 
  },
  { 
    id: '2', 
    name: 'Allen Barry', 
    date: '10/9/24', 
    items: [
      { name: 'Item 4', sellingPrice: 20, costToMake: 10 },
      { name: 'Item 5', sellingPrice: 25, costToMake: 12 },
      { name: 'Item 6', sellingPrice: 30, costToMake: 15 },
    ] 
  },
  { 
    id: '3', 
    name: 'Aarry Ballen', 
    date: '10/7/24', 
    items: [
      { name: 'Item 7', sellingPrice: 13, costToMake: 5 },
      { name: 'Item 8', sellingPrice: 17, costToMake: 8 },
      { name: 'Item 9', sellingPrice: 19, costToMake: 10 },
    ] 
  },
];

const OrderAssembly = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [viewedOrder, setViewedOrder] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [completedCount, setCompletedCount] = useState(0);
  const [fabVisible, setFabVisible] = useState(true); // State to manage FAB visibility
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderName, setNewOrderName] = useState('');
  const [newOrderItems, setNewOrderItems] = useState('');
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);

  const handleViewItems = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleAddOrder = () => {
    setAddModalVisible(true);
  };

  const handleSaveNewOrder = () => {
    if (newOrderName.trim() === '' || newOrderItems.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const items = newOrderItems.split(',').map((item, index) => ({
      name: item.trim(),
      sellingPrice: Math.floor(Math.random() * 20) + 10, // Random selling price for simplicity
      costToMake: Math.floor(Math.random() * 10) + 5, // Random cost to make for simplicity
    }));

    const newOrder = {
      id: (orders.length + 1).toString(),
      name: newOrderName,
      date: new Date().toLocaleDateString(),
      items,
    };

    setOrders([...orders, newOrder]);
    setAddModalVisible(false);
    setNewOrderName('');
    setNewOrderItems('');
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleEditOrder = (order) => {
    // For simplicity, just setting this order as the selected one to "edit"
    setSelectedOrder(order);
    setModalVisible(true);
  };

  // Toggle the visibility of the delete and edit buttons
  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
    setShowEditButtons(false);
  };

  const toggleEditButtons = () => {
    setShowEditButtons(!showEditButtons);
    setShowDeleteButtons(false);
  };

  // Custom actions for the LocalFAB
  const fabActions = [
    {
      icon: 'plus',
      label: 'Add Order',
      onPress: handleAddOrder,
    },
    {
      icon: 'delete',
      label: 'Delete Order',
      onPress: toggleDeleteButtons,
    },
    {
      icon: 'pencil',
      label: 'Edit Order',
      onPress: toggleEditButtons,
    },
  ];

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
            <TouchableOpacity
              style={[styles.viewButton, { backgroundColor: colors.primary }]}
              onPress={() => handleViewItems(order)}
            >
              <Text style={[styles.viewButtonText, { color: colors.onPrimary }]}>View Items</Text>
            </TouchableOpacity>
            {showDeleteButtons && (
              <TouchableOpacity
                style={[styles.deleteButton]}
                onPress={() => handleDeleteOrder(order.id)}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            )}
            {showEditButtons && (
              <TouchableOpacity
                style={[styles.editButton]}
                onPress={() => handleEditOrder(order)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      ))}

      {/* Modal for viewing order details */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <Text style={styles.modalTitle}>Order Details</Text>
                <Text style={styles.modalText}>Customer Name: {selectedOrder.name}</Text>
                <Text style={styles.modalText}>Date: {selectedOrder.date}</Text>
                <Text style={styles.modalText}>Number of Items: {selectedOrder.items.length}</Text>
                <FlatList
                  data={selectedOrder.items}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <View style={styles.itemDetailRow}>
                      <Text style={styles.itemDetailText}>
                        {item.name} - Selling Price: ${item.sellingPrice}, Cost to Make: ${item.costToMake}
                      </Text>
                    </View>
                  )}
                />
                <Text style={styles.modalTotalText}>
                  Total Price: ${selectedOrder.items.reduce((acc, item) => acc + item.sellingPrice, 0)}
                </Text>
                <Text style={styles.modalTotalText}>
                  Total Cost to Make: ${selectedOrder.items.reduce((acc, item) => acc + item.costToMake, 0)}
                </Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for adding new order */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Order</Text>
            <TextInput
              placeholder="Order Name"
              value={newOrderName}
              onChangeText={setNewOrderName}
              style={styles.input}
            />
            <TextInput
              placeholder="Items (comma separated)"
              value={newOrderItems}
              onChangeText={setNewOrderItems}
              style={styles.input}
            />
            <Button title="Save Order" onPress={handleSaveNewOrder} />
            <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={[styles.completedBox, { backgroundColor: colors.primaryContainer }]}>
        <Text style={[styles.completedText, { color: colors.onPrimaryContainer }]}>Completed</Text>
        <Text style={[styles.completedCounter, { color: colors.onPrimaryContainer }]}>
          {completedCount}/{orders.reduce((acc, order) => acc + order.items.length, 0)}
        </Text>
      </View>

      {/* LocalFAB for add, delete, and edit actions */}
      <LocalFAB actions={fabActions} visible={fabVisible} />
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
    marginLeft: 10,
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemDetailRow: {
    marginBottom: 5,
  },
  itemDetailText: {
    fontSize: 14,
  },
  modalTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
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
