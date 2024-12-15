import React, {useEffect, useState} from "react";
import {View, Alert, StyleSheet} from "react-native";
import {Icon, Snackbar, Text} from "react-native-paper";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import {creationPageStyles} from "../../../styles/pageType/creationPageStyles.jsx";
import {globalVariable} from "../../../_layout.jsx";
import {fireDb} from "../../../firebase/initializeFirebase.js";
import {MyButton} from "../../../../components/inputs/MyButton.jsx";
import {BackDrop} from "../../../../components/overlays/Backdrop.jsx";
import {router, useLocalSearchParams} from "expo-router";
import {fetchOrderData} from "../../../firebase/orderFunctions.js";
import {MyTextInput} from "../../../../components/inputs/MyTextInput.jsx";
import {Dropdown} from "react-native-element-dropdown";
import {roundness} from "../../../styles/themes/roundness/roundness.jsx";

const colors = globalVariable.colors

export default function OrderID() {
	const styles = creationPageStyles();

	const { OrderID } = useLocalSearchParams() // Dynamic slug for the order ID

	const [isSnack, setSnack] = useState(false);
	const [snackText, setSnackText] = useState("");
	const [customerName, setCustomerName] = useState('')
	const [items, setItems] = useState([])
	const [notes, setNotes] = useState('')

	// Function to delete the order and its related items
	const handleDeleteOrder = async () => {
		try {
			if (!OrderID) {
				throw new Error("OrderID is missing");
			}

			const currOrg = `Org.${globalVariable.currentOrg}`;
			const orderRef = doc(fireDb, `organizations/${currOrg}/orders`, OrderID);

			// Delete related items
			const itemsRef = collection(orderRef, "items");
			const itemsSnapshot = await getDocs(itemsRef);
			const deleteItemPromises = itemsSnapshot.docs.map((itemDoc) => deleteDoc(itemDoc.ref));
			await Promise.all(deleteItemPromises);

			// Delete the order itself
			await deleteDoc(orderRef);

			setSnackText("Order and its items have been successfully deleted.");
			setSnack(true);
		} catch (error) {
			console.error("Error deleting order:", error);
			setSnackText(`Error deleting order: ${error.message}`);
			setSnack(true);
		}
		router.back()
	};

	// Confirmation before deletion
	const confirmDelete = async () => {

		Alert.alert(
			"Confirm Delete",
			"Are you sure you want to delete this order? This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Delete", style: "destructive", onPress: handleDeleteOrder },
			]
		);
	};

	const initializeOrderData = async () => {
		const orderData = await fetchOrderData(OrderID);
		if (orderData) {
			setNotes(orderData.notes);
			setCustomerName(orderData.customer);
			setItems(orderData.items);
		} else {
			setSnackText("Order not found.");
			setSnack(true);
			router.back(); // Navigate back if order isn't found
		}
	};

	const handleQuantityChange = (index, quantity) => {
		if (quantity === "" || /^[0-9]*$/.test(quantity)) {
			setItems(prevItems => {
				const updatedItems = [...prevItems];
				updatedItems[index] = { ...updatedItems[index], quantity: quantity === "" ? 1 : parseInt(quantity, 10) };
				return updatedItems;
			});
		}
	};

	const renderDropdown = (index) => (
		<View key={index} style={fileStyles.dropdownContainer}>
			<Dropdown
				style={[fileStyles.dropdown, { width: 70}]}
				placeholderStyle={fileStyles.placeholderStyle}
				selectedTextStyle={fileStyles.selectedTextStyle}
				inputSearchStyle={fileStyles.inputSearchStyle}
				iconStyle={fileStyles.iconStyle}
				data={Array.from({ length: 20 }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }))}
				maxHeight={150}
				labelField="label"
				valueField="value"
				placeholder="Qty"
				value={items[index]?.quantity} // Access quantity safely and convert to string
				onChange={({ value }) => handleQuantityChange(index, value)}
			/>
			<Text style={fileStyles.itemName}>{items[index]?.name}</Text> {/* Display item name */}
		</View>
	);



	useEffect(() => {

		initializeOrderData()
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<BackDrop title="Order Details" mainHeader={false} showOrg={true}>
				<View style={styles.middleView}>
					<MyTextInput
						placeholder={'Customer Name'}
						onChangeText={setCustomerName}
						value={customerName}
						editable={false} // Make read-only
					/>
					<MyTextInput
						placeholder={'Notes'}
						onChangeText={setNotes}
						value={notes}
						editable={false} // Make read-only
					/>

					{items.length > 0 && items.map((_, index) => renderDropdown(index))} {/* Conditionally render dropdowns */}

				</View>

				<View style={styles.bottomView}>
					<MyButton
						title="Delete Order"
						onClick={confirmDelete}
						style={styles.button}
						variant="titleLarge"
					/>
				</View>
			</BackDrop>

			<Snackbar visible={isSnack} onDismiss={() => setSnack(false)} duration={4000}>
				{snackText}
			</Snackbar>
		</View>
	);
}

const fileStyles = StyleSheet.create({
	dropdownContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		backgroundColor: colors.primaryContainer,
		padding: 5,
		borderRadius: roundness.mediumRadius
	},
	dropdown: {
		height: 50,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 10,
		marginRight: 10,
	},
	placeholderStyle: {
		fontSize: 16,
		color: '#aaa',
	},
	selectedTextStyle: {
		fontSize: 16,
		color: '#000',
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
		color: '#000',
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	itemName: { // Style for the item name text
		fontSize: 16,
		flex: 1, // Take up remaining space
	}
});