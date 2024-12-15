import { useEffect, useState } from "react";
import { creationPageStyles } from "../../styles/pageType/creationPageStyles.jsx";
import { router } from "expo-router";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { ScrollView, View, StyleSheet } from "react-native";
import {Portal, Snackbar, Text, Button, Icon} from 'react-native-paper';
import {createOrder, fetchAllInventoryItems} from "../../firebase/orderFunctions.js";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MyTextInput } from "../../../components/inputs/MyTextInput.jsx";
import { MyButton } from "../../../components/inputs/MyButton.jsx";
import {globalVariable} from "../../_layout.jsx";
import {roundness} from "../../styles/themes/roundness/roundness.jsx";

const colors = globalVariable.colors

export default function CreateOrder() {
	const styles = creationPageStyles();
	const [customerName, setCustomerName] = useState('');
	const [orderNotes, setOrderNotes] = useState('');
	const [snackText, setSnackText] = useState('');
	const [snackVisible, setSnackVisible] = useState(false);
	const [inventoryItems, setInventoryItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([{ item: null, quantity: 1 }]);

	// Fetch inventory items on component mount
	useEffect(() => {
		const loadItems = async () => {
			try {
				const fetchedItems = await fetchAllInventoryItems();
				setInventoryItems(fetchedItems);
			} catch (error) {
				console.error("Error fetching items:", error);
				setSnackText('Could not fetch inventory');
				setSnackVisible(true);
			}
		};

		loadItems();
	}, []);


	// Validate and create order
	const handleCreateOrder = async () => {
		const trimmedName = customerName.trim();
		const trimmedNotes = orderNotes.trim();

		if (!trimmedName) {
			setSnackText('Please fill in the customer name');
			setSnackVisible(true);
			return;
		}

		if (selectedItems.some(item => item.quantity < 1 || isNaN(item.quantity))) {
			setSnackText('Please ensure all quantities are valid');
			setSnackVisible(true);
			return;
		}

		if (selectedItems.some(item => item.item === null)) {
			setSnackText('Please select an item');
			setSnackVisible(true);
			return;
		}

		// Calculate total cost
		let totalCost = 0;
		selectedItems.forEach(item => {
			if (item.item && item.item.price) { // Check if item is selected and has a price
				totalCost += item.item.price * item.quantity;
			} else {
				console.warn('An item in selectedItems is missing price information:', item);
			}
		});

		try {
			const orderData = {
				customerName: trimmedName,
				notes: trimmedNotes,
				items: selectedItems.map(({ item, quantity }) => ({
					id: item.id,
					name: item.name,
					quantity: parseInt(quantity, 10),
					category: item.category,
					price: parseFloat(item.price)
				})),
				totalCost
			};
			console.log('OrderData: ', orderData);

			await createOrder(orderData);
			router.back();
		} catch (error) {
			console.error('Error creating order:', error);
			setSnackText('Could not create order');
			setSnackVisible(true);
		}
	};

	// Add a new item row
	const handleAddItem = () => {
		setSelectedItems(prevItems => [...prevItems, { item: null, quantity: 1 }]);
	};


	// Remove an item row
	const handleRemoveItem = (index) => {
		setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
	};


	// Update selected item for a specific row
	const handleItemSelect = (index, item) => {
		setSelectedItems(prevItems => {
			const updatedItems = [...prevItems];
			updatedItems[index].item = item;
			return updatedItems;
		});
	};

	// Update quantity for a specific row
	const handleQuantityChange = (index, quantity) => {
		if (quantity === "" || /^[0-9]*$/.test(quantity)) {
			setSelectedItems(prevItems => {
				const updatedItems = [...prevItems];
				updatedItems[index] = { ...updatedItems[index], quantity: quantity === "" ? 1 : parseInt(quantity, 10) };
				return updatedItems;
			});
		}
	};



	// Render dropdowns for item selection and quantity
	const renderDropdown = (index) => (
		<View key={index} style={fileStyles.dropdownContainer}>
			<Dropdown
				style={[fileStyles.dropdown, { maxWidth: 56 }]}
				placeholderStyle={fileStyles.placeholderStyle}
				selectedTextStyle={fileStyles.selectedTextStyle}
				inputSearchStyle={fileStyles.inputSearchStyle}
				iconStyle={fileStyles.iconStyle}
				data={Array.from({ length: 20 }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }))}
				maxHeight={150}
				labelField="label"
				valueField="value"
				placeholder="Qty"
				value={selectedItems[index].quantity}
				onChange={({ value }) => handleQuantityChange(index, value)} // Ensure this passes the correct value
			/>

			<Dropdown
				style={fileStyles.dropdown}
				placeholderStyle={fileStyles.placeholderStyle}
				selectedTextStyle={fileStyles.selectedTextStyle}
				inputSearchStyle={fileStyles.inputSearchStyle}
				iconStyle={fileStyles.iconStyle}
				data={inventoryItems} // Ensure this is correct
				search
				maxHeight={300}
				labelField="name" // Matches key in inventoryItems
				valueField="id" // Matches key in inventoryItems
				placeholder="Select an item"
				searchPlaceholder="Search..."
				value={selectedItems[index].item?.id}
				onChange={item => handleItemSelect(index, item)}
			/>
			<MyButton title={'Remove'} style={{backgroundColor: colors.primaryContainer}} onClick={() => handleRemoveItem(index)} />
		</View>
	);

	return (
		<BackDrop header={false}>

			<View style={styles.topView} >

				<Text variant={'displayMedium'} style={{textAlign: 'center'}} >
					Create your order!
				</Text>

				<Icon size={50} source={'bee'} />
			</View>

			<ScrollView contentContainerStyle={styles.middleView}>
				<MyTextInput placeholder={'Customer Name'} value={customerName} onChangeText={setCustomerName} />
				<MyTextInput placeholder={'Notes'} value={orderNotes} onChangeText={setOrderNotes} multiline={true} numberOfLines={3} />

				{selectedItems.map((_, index) => renderDropdown(index))}

				<MyButton title="Add Another Item" style={styles.button} onClick={handleAddItem} />

				<MyButton
					title={'Create Order'}
					style={styles.button}
					onClick={handleCreateOrder}
					variant={'titleMedium'}
					elevation={2}
				/>
				<MyButton
					title={'Cancel'}
					style={styles.button}
					onClick={() => router.back()}
					variant={'titleMedium'}
					elevation={2}
				/>
			</ScrollView>

			<Portal>
				<Snackbar duration={4000} visible={snackVisible} onDismiss={() => setSnackVisible(false)}>
					{snackText}
				</Snackbar>
			</Portal>
		</BackDrop>
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
		flex: 1,
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
	dropdownItem: {
		padding: 10,
		fontSize: 16,
	},
	middleView: {
		paddingBottom: 20,
	}
});
