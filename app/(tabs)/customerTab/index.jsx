import { View, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import { Text, Button, Checkbox, Card, IconButton, Divider, Title, Paragraph, Portal, FAB } from "react-native-paper";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../_layout.jsx";
import { useFocusEffect } from "expo-router";

const initialCustomers = {
  "Location 1": [
    { id: 1, name: "Joey", price: "$50", notes: "Customer notes", totalOrders: 1, completedOrders: 0 },
    { id: 2, name: "Nelly", price: "$50", notes: "", totalOrders: 1, completedOrders: 0 },
  ],
  "Location 2": [
    { id: 3, name: "Pat", price: "$50", notes: "", totalOrders: 1, completedOrders: 0 },
  ],
};

export default function CustomerPage() {
  const { setFabVisible } = useContext(AppContext);
  const [isDeleteMode, setDeleteMode] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customers, setCustomers] = useState(initialCustomers);
  const [addCustomerModalVisible, setAddCustomerModalVisible] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // Form state for adding a new customer
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    notes: '',
  });

  useFocusEffect(
    useCallback(() => {
      setFabVisible(false); // Hide global FAB on this screen
      return () => setFabVisible(false);
    }, [])
  );

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerId)
        ? prevSelected.filter((id) => id !== customerId)
        : [...prevSelected, customerId]
    );
  };

  const handleDeleteCustomers = () => {
    const updatedCustomers = {};
    for (const location in customers) {
      updatedCustomers[location] = customers[location].filter(
        (customer) => !selectedCustomers.includes(customer.id)
      );
    }
    setCustomers(updatedCustomers);
    setSelectedCustomers([]);
    setDeleteMode(false);
  };

  const handleAddCustomer = () => {
    const location = newCustomer.location || 'Uncategorized';
    const newCustomerData = {
      id: Date.now(), // Unique ID
      ...newCustomer,
      price: "$50", // Default price
      totalOrders: 0,
      completedOrders: 0,
    };
    setCustomers((prevCustomers) => ({
      ...prevCustomers,
      [location]: [...(prevCustomers[location] || []), newCustomerData],
    }));
    setAddCustomerModalVisible(false);
    setNewCustomer({ name: '', email: '', phone: '', location: '', notes: '' });
  };

  const handleFabStateChange = ({ open }) => setFabOpen(open);

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.keys(customers).map((location) => (
          <View key={location} style={styles.locationContainer}>
            <Title style={styles.locationTitle}>{location}</Title>
            <Divider style={styles.divider} />
            {customers[location].map((customer) => (
              <Card key={customer.id} style={styles.customerCard}>
                <Card.Content style={styles.cardContent}>
                  {isDeleteMode && (
                    <Checkbox
                      status={selectedCustomers.includes(customer.id) ? "checked" : "unchecked"}
                      onPress={() => handleSelectCustomer(customer.id)}
                    />
                  )}
                  <View style={styles.cardText}>
                    <Title style={styles.customerName}>{customer.name}</Title>
                    <Paragraph style={styles.customerInfo}>Price: {customer.price}</Paragraph>
                    <Paragraph style={styles.customerInfo}>Orders: {customer.totalOrders}</Paragraph>
                    <Paragraph style={styles.customerInfo}>Completed: {customer.completedOrders}</Paragraph>
                    <Paragraph style={styles.customerNotes}>{customer.notes}</Paragraph>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Footer for Delete Mode */}
      {isDeleteMode && (
        <View style={styles.deleteFooter}>
          <IconButton
            icon="delete"
            size={30}
            color="red"
            onPress={handleDeleteCustomers}
            style={styles.trashIcon}
          />
          <Button mode="text" onPress={() => setDeleteMode(false)} style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
      )}

      {/* FAB Group */}
      <FAB.Group
        open={fabOpen}
        icon={fabOpen ? "close" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add Customer",
            onPress: () => setAddCustomerModalVisible(true),
          },
          {
            icon: "delete",
            label: "Delete Selected",
            onPress: () => setDeleteMode(true), // Toggle delete mode on trash icon click
          },
        ]}
        onStateChange={handleFabStateChange}
        style={styles.fabGroup}
      />

      {/* Add Customer Modal */}
      <Modal
        visible={addCustomerModalVisible}
        onRequestClose={() => setAddCustomerModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Customer</Text>
            <TextInput placeholder="Name" style={styles.input} value={newCustomer.name} onChangeText={(text) => setNewCustomer({ ...newCustomer, name: text })} />
            <TextInput placeholder="Email" style={styles.input} value={newCustomer.email} onChangeText={(text) => setNewCustomer({ ...newCustomer, email: text })} />
            <TextInput placeholder="Phone" style={styles.input} value={newCustomer.phone} onChangeText={(text) => setNewCustomer({ ...newCustomer, phone: text })} />
            <TextInput placeholder="Location" style={styles.input} value={newCustomer.location} onChangeText={(text) => setNewCustomer({ ...newCustomer, location: text })} />
            <TextInput placeholder="Notes" style={styles.input} value={newCustomer.notes} onChangeText={(text) => setNewCustomer({ ...newCustomer, notes: text })} />
            <View style={styles.buttonContainer}>
              <Button mode="text" onPress={() => setAddCustomerModalVisible(false)}>Cancel</Button>
              <Button mode="contained" onPress={handleAddCustomer}>Add</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  divider: {
    marginVertical: 8,
  },
  customerCard: {
    backgroundColor: "#FAD4D4",
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    marginLeft: 8,
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customerInfo: {
    fontSize: 14,
  },
  customerNotes: {
    fontSize: 12,
    color: "gray",
  },
  deleteFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    backgroundColor: "#f8d7da",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  trashIcon: {
    marginBottom: 4,
  },
  fabGroup: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    fontSize: 16,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    fontSize: 16,
  },
});
