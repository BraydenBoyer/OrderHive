import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Button, TextInput, Alert } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { LocalFAB } from "../../../components/overlays/LocalFAB.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addOrder, fetchOrders, deleteOrder, updateOrder } from "../../firebase/orderFunctions.js";

const colors = lightTheme.colors;

const OrderAssembly = () => {
  const [orders, setOrders] = useState([]); // Initially empty, fetched from Firebase
  const [viewedOrder, setViewedOrder] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [completedCount, setCompletedCount] = useState(0);
  const [fabVisible, setFabVisible] = useState(true);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderName, setNewOrderName] = useState('');
  const [newOrderItems, setNewOrderItems] = useState([]);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);

  // Fetch orders from Firebase when component mounts
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders(); // Fetch orders from Firebase
        setOrders(fetchedOrders); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching orders:", error);
        Alert.alert("Error", "Failed to fetch orders from the server.");
      }
    };

    loadOrders();
  }, []);

  const handleViewItems = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleAddOrder = () => {
    setAddModalVisible(true);
  };

  const handleSaveNewOrder = async () => {
    if (newOrderName.trim() === '') {
      Alert.alert('Error', 'Client name is required');
      return;
    }

    if (newOrderItems.length === 0) {
      Alert.alert('Error', 'At least one item must be added');
      return;
    }

    const validItems = newOrderItems.map((item) => ({
      name: item.name.trim(),
      sellingPrice: parseFloat(item.sellingPrice),
      costToMake: parseFloat(item.costToMake),
    }));

    if (validItems.some(item => !item.name || isNaN(item.sellingPrice) || isNaN(item.costToMake))) {
      Alert.alert('Error', 'All item fields must be filled out correctly');
      return;
    }

    const newOrder = {
      name: newOrderName,
      date: new Date().toLocaleDateString(),
      items: validItems,
      numberOfItems: validItems.length,
    };

    try {
      const savedOrder = await addOrder(newOrder); // Save the order to Firebase
      Alert.alert('Success', 'Order added successfully');
      setOrders([...orders, savedOrder]); // Update local state
      setAddModalVisible(false);
      setNewOrderName('');
      setNewOrderItems([]);
    } catch (error) {
      console.error('Error saving order:', error);
      Alert.alert('Error', 'Failed to add order');
    }
  };
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newOrderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewOrderItems(updatedItems);
  };
  
  const addNewItemRow = () => {
    setNewOrderItems([
      ...newOrderItems,
      { name: "", sellingPrice: "", costToMake: "" },
    ]);
  };
  
  const removeItem = (index) => {
    const updatedItems = newOrderItems.filter((_, i) => i !== index);
    setNewOrderItems(updatedItems);
  };
  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id); // Delete the order from Firebase
      setOrders(orders.filter(order => order.id !== id)); // Update local state
      Alert.alert("Success", "Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      Alert.alert("Error", "Failed to delete order");
    }
  };

  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
    setShowEditButtons(false);
  };

  const toggleEditButtons = () => {
    setShowEditButtons(!showEditButtons);
    setShowDeleteButtons(false);
  };

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
    <BackDrop title="Order Creation" mainHeader={false}>
      {/* Order List */}
      {orders.map((order) => (
  <Card key={order.id} style={[styles.card, { backgroundColor: colors.surface }]}>
    <View style={styles.cardContent}>
      <View style={styles.leftSection}>
        <Checkbox
          status={
            completedItems[order.id]?.length === order.items.length ? 'checked' : 'unchecked'
          }
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
          onPress={() =>
            Alert.alert(
              "Confirm Delete",
              "Are you sure you want to delete this order?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => handleDeleteOrder(order.id) }
              ]
            )
          }
        >
          <Icon name="trash-can" size={20} color="red" />
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
                <FlatList
                  data={selectedOrder.items}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <View style={styles.itemDetailRow}>
                      <Text style={styles.itemDetailText}>
                        {item.name} - SP: ${item.sellingPrice}, COGS: ${item.costToMake}
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

      <Modal
  visible={isAddModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setAddModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.addOrderModalContent}>
      <Text style={styles.addOrderModalTitle}>Add New Order</Text>
      <TextInput
        placeholder="Client Name"
        placeholderTextColor="#888"
        style={styles.addOrderInput}
        value={newOrderName}
        onChangeText={setNewOrderName}
      />

      {/* Render multiple items */}
      <FlatList
  data={newOrderItems}
  keyExtractor={(item, index) => `item-${index}`}
  renderItem={({ item, index }) => (
    <View style={styles.itemRow}>
      <TextInput
        placeholder="Item Name"
        placeholderTextColor="#888"
        style={[styles.itemInput, { flex: 2 }]}
        value={item.name}
        onChangeText={(text) => handleItemChange(index, "name", text)}
      />
      <TextInput
        placeholder="Selling Price"
        placeholderTextColor="#888"
        style={[styles.itemInput, { flex: 1 }]}
        value={item.sellingPrice}
        keyboardType="numeric"
        onChangeText={(text) => handleItemChange(index, "sellingPrice", text)}
      />
      <TextInput
        placeholder="Cost to Make"
        placeholderTextColor="#888"
        style={[styles.itemInput, { flex: 1 }]}
        value={item.costToMake}
        keyboardType="numeric"
        onChangeText={(text) => handleItemChange(index, "costToMake", text)}
      />
      <TouchableOpacity
        onPress={() => removeItem(index)}
        style={styles.deleteItemButton}
      >
        <Icon name="trash-can" size={20} color="red" />
      </TouchableOpacity>
    </View>
  )}
/>

      <TouchableOpacity
        style={styles.addItemButton}
        onPress={addNewItemRow}
      >
        <Text style={styles.addItemButtonText}>+ Add Item</Text>
      </TouchableOpacity>

      <View style={styles.addOrderButtonContainer}>
        <Button title="Save Order" onPress={handleSaveNewOrder} />
        <Button
          title="Cancel"
          onPress={() => setAddModalVisible(false)}
          color="red"
        />
      </View>
    </View>
  </View>
</Modal>


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
  justifyContent: "center",
  alignItems: "center",
  padding: 5,
  marginLeft: 10,
},
  deleteButtonText: {
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  itemDetailRow: {
    marginBottom: 10,
  },
  itemDetailText: {
    fontSize: 14,
  },
  modalTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addOrderModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addOrderModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  addOrderInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  deleteItemButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  deleteItemButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  addItemButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  addItemButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderAssembly;
