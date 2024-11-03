import { Tabs, useFocusEffect } from "expo-router";
import { View, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import {
  Text,
  Button,
  FAB,
  Checkbox,
  Card,
  IconButton,
  useTheme,
  Menu,
  Divider,
  Title,
  Paragraph,
  Portal,
  Dialog,
  Icon
} from "react-native-paper";
import { router } from 'expo-router';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { MyFAB } from "../../../components/overlays/FAB.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../_layout.jsx";


// Sample data structure for customers
const customersByLocation = {
  "Location 1": [
    {
      name: "Joey",
      price: "$50",
      notes: "Notes about the customer if there are any...",
      totalOrders: 1,
      completedOrders: 0,
    },
    {
      name: "Nelly",
      price: "$50",
      notes: "",
      totalOrders: 1,
      completedOrders: 0,
    },
  ],
  "Location 2": [
    {
      name: "Pat",
      price: "$50",
      notes: "",
      totalOrders: 1,
      completedOrders: 0,
    },
  ],
};

export default function CustomerPage() {
  const { setFabVisible } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setFabVisible(true);
      return () => setFabVisible(false);
    }, [])
  );

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedCustomer(null);
  };

  return (
    <BackDrop style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <IconButton icon="filter" size={24} />
        <TextInput
          placeholder="Hinted search text"
          mode="outlined"
          style={styles.searchInput}
        />
        <Icon size={30} source={'magnify'} />
      </View>


      {Object.keys(customersByLocation).map((location) => (
        <View key={location} style={styles.locationContainer}>
          <Title style={styles.locationTitle}>{location}</Title>
          <Divider style={styles.divider} />
          {customersByLocation[location].map((customer, index) => (
            <Card
              key={index}
              style={styles.customerCard}
              onPress={() => openCustomerDetails(customer)}
            >
              <Card.Content>
                <Title style={styles.customerName}>{customer.name}</Title>
                <Paragraph style={styles.customerInfo}>Price: {customer.price}</Paragraph>
                <Paragraph style={styles.customerInfo}>Orders: {customer.totalOrders}</Paragraph>
                <Paragraph style={styles.customerInfo}>Completed: {customer.completedOrders}</Paragraph>
                <Paragraph style={styles.customerNotes}>{customer.notes}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      ))}


      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog} style={styles.dialog}>
          <Dialog.Title>Customer Details</Dialog.Title>
          <Dialog.Content>
            {selectedCustomer && (
              <>
                <Text style={styles.dialogText}>Name: {selectedCustomer.name}</Text>
                <Text style={styles.dialogText}>Phone: 123-456-7890</Text>
                <Text style={styles.dialogText}>Email: example@example.com</Text>
                <Text style={styles.dialogText}>Location: Northeast</Text>
                <Text style={styles.dialogText}>Notes: {selectedCustomer.notes}</Text>
                <Text style={styles.dialogText}>Total Orders: {selectedCustomer.totalOrders}</Text>
                <Text style={styles.dialogText}>Completed Orders: {selectedCustomer.completedOrders}</Text>
              </>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {
        true ? <></> :

      <Portal>
        <FAB.Group
          open={visible}
          icon={visible ? "close" : "plus"}
          actions={[
            { icon: "plus", label: "Add", onPress: () => console.log("Add pressed") },
            { icon: "cancel", label: "Cancel", onPress: () => setVisible(false) },
          ]}
          onStateChange={() => setVisible(!visible)}
          style={styles.fabGroup}
        />
      </Portal>
      }
    </BackDrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
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
  dialog: {
    backgroundColor: "#FAD4D4",
    borderRadius: 8,
    padding: 16,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 4,
  },
  fabGroup: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});

