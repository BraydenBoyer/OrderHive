import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import {collection, doc, setDoc, query, where, getDocs, deleteDoc, updateDoc} from "firebase/firestore";
import { fireDb } from '../../firebase/initializeFirebase';
import {globalVariable} from '../../_layout.jsx'


export default function ModifyItemPage({ route, navigation }) {
  const theme = useTheme();
  const colors = theme.colors;

  //extract item data from navigation
  const { itemData } = route.params;
  const item = JSON.parse(itemData);

  //item states for fields
  const [productName, setProductName] = useState(item.name || "");
  const [salesCost, setSalesCost] = useState(item.price?.toString() || "");
  const [manufactureCost, setManufactureCost] = useState(
    item.purchasePrice?.toString() || ""
  );
  const [metaData, setMetaData] = useState(item.metadata?.join(", ") || "");

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    try {

        const orgName = "Org." + globalVariable.currentOrg
      //reference item to firestone
      const itemRef = doc(fireDb, `organizations/${orgName}/inventory/${item.category}/items`, item.id);

      //prepare updated data
      const updatedData = {
        name: productName,
        price: parseFloat(salesCost),
        purchasePrice: parseFloat(manufactureCost),
        metadata: metaData.split(',').map(tag => tag.trim()), // Convert comma-separated string to array
      };

      //update document in firestone
      await updateDoc(itemRef, updatedData);

      console.log('Item successfully updated:', updatedData);

      //navigate to previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating item:', error);
      // Handle the error appropriately in your UI
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Modify Item</Text>

      <View style={styles.inputContainer}>
        {/* Product Name */}
        <TextInput
          label="Product Name"
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
        />

        {/* Sales Cost */}
        <TextInput
          label="Sales Cost"
          value={salesCost}
          onChangeText={setSalesCost}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Manufacture Cost */}
        <TextInput
          label="Manufacture Cost"
          value={manufactureCost}
          onChangeText={setManufactureCost}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Meta Data */}
        <TextInput
          label="Meta Data"
          value={metaData}
          onChangeText={setMetaData}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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