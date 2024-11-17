import { View, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import { Text, Button, Checkbox, Card, IconButton, Divider, Title, Paragraph, Portal, FAB, Dialog, useTheme } from "react-native-paper";
import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../_layout.jsx";
import { collection, doc, setDoc, deleteDoc, getDocs, addDoc } from "firebase/firestore";
import { fireDb } from '../../firebase/initializeFirebase';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import {LocalFAB} from '../../../components/overlays/LocalFAB.jsx'
import { Tabs, useFocusEffect } from "expo-router";

export default function CustomerPage() {
  const { setFabVisible } = useContext(AppContext);
  const [isDeleteMode, setDeleteMode] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [groupedCustomerData, setGroupedCustomerData] = useState({});
  const [addCustomerModalVisible, setAddCustomerModalVisible] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetailVisible, setCustomerDetailVisible] = useState(false);
  //for local fab
    const [visible, setVisible] = useState(false)


  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    notes: '',
    totalOrders: '',
    completedOrders: '',
  });

  const theme = useTheme();
  const colors = theme.colors;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRef = collection(fireDb, 'customers');
        const querySnapshot = await getDocs(customerRef);
        const customerData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const groupedData = customerData.reduce((acc, customer) => {
          const location = customer.location || 'Uncategorized';
          if (!acc[location]) {
            acc[location] = [];
          }
          acc[location].push(customer);
          return acc;
        }, {});

        setGroupedCustomerData(groupedData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteCustomer = async (customerId) => {
    try {
      await deleteDoc(doc(fireDb, "customers", customerId));
      return true;
    } catch (error) {
      console.error("Error deleting customer:", error);
      return false;
    }
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerId)
        ? prevSelected.filter((id) => id !== customerId)
        : [...prevSelected, customerId]
    );
  };

  const handleDeleteCustomers = async () => {
    for (const customerId of selectedCustomers) {
      const success = await deleteCustomer(customerId);
      if (!success) {
        console.error(`Failed to delete customer with ID: ${customerId}`);
      }
    }

    const updatedGroupedData = { ...groupedCustomerData };
    Object.keys(updatedGroupedData).forEach((location) => {
      updatedGroupedData[location] = updatedGroupedData[location].filter(
        (customer) => !selectedCustomers.includes(customer.id)
      );
    });

    setGroupedCustomerData(updatedGroupedData);
    setSelectedCustomers([]);
    setDeleteMode(false);
  };

  const handleAddCustomer = async () => {
    const location = newCustomer.location || 'Uncategorized';
    const newCustomerData = {
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      location: location,
      notes: newCustomer.notes,
      totalOrders: parseInt(newCustomer.totalOrders) || 0,
      completedOrders: parseInt(newCustomer.completedOrders) || 0,
    };

    try {
      const docRef = await addDoc(collection(fireDb, "customers"), newCustomerData);
      const addedCustomer = { id: docRef.id, ...newCustomerData };

      setGroupedCustomerData((prevData) => ({
        ...prevData,
        [location]: [...(prevData[location] || []), addedCustomer],
      }));

      setAddCustomerModalVisible(false);
      setNewCustomer({ name: '', email: '', phone: '', location: '', notes: '', totalOrders: '', completedOrders: '' });
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  const handleFabStateChange = ({ open }) => setFabOpen(open);

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setCustomerDetailVisible(true);
  };

  const closeCustomerDetails = () => {
    setCustomerDetailVisible(false);
    setSelectedCustomer(null);
  };

  //for local fab
      useFocusEffect(
          useCallback(() => {

              setVisible(true)

              return () => {
                  setVisible(false)
              }
          }, [setVisible])
      )

  return (
    <BackDrop title={"CustomerTab"}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView>
          {Object.keys(groupedCustomerData).map((location) => (
            <View key={location} style={styles.locationContainer}>
              <Title style={[styles.locationTitle, { color: colors.primary }]}>{location}</Title>
              <Divider style={[styles.divider, { backgroundColor: colors.onSurface }]} />

              {groupedCustomerData[location].map((customer) => (
                <Card
                  key={customer.id}
                  style={[styles.customerCard, { backgroundColor: colors.surface }]}
                  onPress={() => openCustomerDetails(customer)} // Open details on card press
                >
                  <Card.Content style={styles.cardContent}>
                    {isDeleteMode && (
                      <Checkbox
                        status={selectedCustomers.includes(customer.id) ? "checked" : "unchecked"}
                        onPress={() => handleSelectCustomer(customer.id)}
                      />
                    )}
                    <View style={styles.cardText}>
                      <Title style={[styles.customerName, { color: colors.onSurface }]}>{customer.name}</Title>
                      <Paragraph style={[styles.customerInfo, { color: colors.onSurfaceVariant }]}>Price: {customer.price}</Paragraph>
                      <Paragraph style={[styles.customerInfo, { color: colors.onSurfaceVariant }]}>Orders: {customer.totalOrders}</Paragraph>
                      <Paragraph style={[styles.customerInfo, { color: colors.onSurfaceVariant }]}>Completed: {customer.completedOrders}</Paragraph>
                      <Paragraph style={[styles.customerNotes, { color: colors.secondary }]}>{customer.notes}</Paragraph>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </View>
          ))}
        </ScrollView>

        <Portal>
          <Dialog visible={customerDetailVisible} onDismiss={closeCustomerDetails}>
            <Dialog.Title>Customer Details</Dialog.Title>
            <Dialog.Content>
              {selectedCustomer && (
                <>
                  <Text>Name: {selectedCustomer.name}</Text>
                  <Text>Email: {selectedCustomer.email}</Text>
                  <Text>Phone: {selectedCustomer.phone}</Text>
                  <Text>Location: {selectedCustomer.location}</Text>
                  <Text>Notes: {selectedCustomer.notes}</Text>
                  <Text>Total Orders: {selectedCustomer.totalOrders}</Text>
                  <Text>Completed Orders: {selectedCustomer.completedOrders}</Text>
                </>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closeCustomerDetails}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {isDeleteMode && (
          <View style={[styles.deleteFooter, { backgroundColor: colors.errorContainer }]}>
            <IconButton
              icon="delete"
              size={30}
              color={colors.onError}
              onPress={handleDeleteCustomers}
              style={styles.trashIcon}
            />
            <Button mode="text" onPress={() => setDeleteMode(false)} style={styles.cancelButton} color={colors.onError}>
              Cancel
            </Button>
          </View>
        )}
        <LocalFAB visible={visible} icon={['plus', 'trashIcon']} actions={[
            { icon: "plus", label: "Add Customer", onPress: () => setAddCustomerModalVisible(true) },
            { icon: "delete", label: "Delete Selected", onPress: () => setDeleteMode(true) },

                    ]} />

        <Modal
          visible={addCustomerModalVisible}
          onRequestClose={() => setAddCustomerModalVisible(false)}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: colors.onSurface }]}>Add Customer</Text>
              <TextInput placeholder="Name" style={styles.input} value={newCustomer.name} onChangeText={(text) => setNewCustomer({ ...newCustomer, name: text })} />
              <TextInput placeholder="Email" style={styles.input} value={newCustomer.email} onChangeText={(text) => setNewCustomer({ ...newCustomer, email: text })} />
              <TextInput placeholder="Phone" style={styles.input} value={newCustomer.phone} onChangeText={(text) => setNewCustomer({ ...newCustomer, phone: text })} />
              <TextInput placeholder="Location" style={styles.input} value={newCustomer.location} onChangeText={(text) => setNewCustomer({ ...newCustomer, location: text })} />
              <TextInput placeholder="Notes" style={styles.input} value={newCustomer.notes} onChangeText={(text) => setNewCustomer({ ...newCustomer, notes: text })} />
              <TextInput placeholder="Total Orders" style={styles.input} keyboardType="numeric" value={newCustomer.totalOrders} onChangeText={(text) => setNewCustomer({ ...newCustomer, totalOrders: text })} />
              <TextInput placeholder="Completed Orders" style={styles.input} keyboardType="numeric" value={newCustomer.completedOrders} onChangeText={(text) => setNewCustomer({ ...newCustomer, completedOrders: text })} />
              <View style={styles.buttonContainer}>
                <Button mode="text" onPress={() => setAddCustomerModalVisible(false)} color={colors.onSurface}>
                  Cancel
                </Button>
                <Button mode="contained" onPress={handleAddCustomer} color={colors.primary}>
                  Add
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </BackDrop>
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
  },
  deleteFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
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
});
