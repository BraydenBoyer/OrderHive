import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { doc, updateDoc } from "firebase/firestore";
import { fireDb } from '../../firebase/initializeFirebase';
import { globalVariable } from '../../_layout.jsx';

export default function ModifyCustomerPage({ route, navigation }) {
  const theme = useTheme();
  const colors = theme.colors;

  // Extract customer data from navigation
  const { customerData } = route.params;
  const customer = JSON.parse(customerData);

  // State variables for customer fields
  const [name, setName] = useState(customer.name || "");
  const [email, setEmail] = useState(customer.email || "");
  const [phone, setPhone] = useState(customer.phone || "");
  const [location, setLocation] = useState(customer.location || "");
  const [notes, setNotes] = useState(customer.notes || "");
  const [totalOrders, setTotalOrders] = useState(customer.totalOrders?.toString() || "0");
  const [completedOrders, setCompletedOrders] = useState(customer.completedOrders?.toString() || "0");

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    try {
      const orgName = "Org." + globalVariable.currentOrg;

      const customerRef = doc(fireDb, `organizations/${orgName}/customers`, customer.id);


      const updatedData = {
        name,
        email,
        phone,
        location,
        notes,
        totalOrders: parseInt(totalOrders, 10),
        completedOrders: parseInt(completedOrders, 10),
      };

      //update the document in Firestore
      await updateDoc(customerRef, updatedData);

      console.log('Customer successfully updated:', updatedData);

      //navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating customer:', error);

    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Modify Customer</Text>

      <View style={styles.inputContainer}>
        {/* Name */}
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* Email */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        {/* Phone */}
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        {/* Location */}
        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />

        {/* Notes */}
        <TextInput
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={styles.input}
        />

        {/* Total Orders */}
        <TextInput
          label="Total Orders"
          value={totalOrders}
          onChangeText={setTotalOrders}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Completed Orders */}
        <TextInput
          label="Completed Orders"
          value={completedOrders}
          onChangeText={setCompletedOrders}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={handleCancel}
          style={styles.button}
          color={colors.primary}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleConfirm}
          style={styles.button}
          color={colors.primary}
        >
          Confirm
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});