import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { MySeachBar } from "../../../components/MySeachBar.jsx";
import {useState, useEffect, useCallback} from "react";
import { MyOrderCard } from "../../../components/MyOrderCard.jsx";
import {deleteFinishedOrders, fetchOrders} from "../../firebase/orderFunctions.js";
import {ActivityIndicator, Alert, View} from 'react-native';
import {LocalFAB} from "../../../components/overlays/LocalFAB.jsx";
import {router, useFocusEffect} from "expo-router";

const OrderList = ({ orders }) => {
	if (!orders) {
		return null;
	}

	return orders.map((order) =>{
		return (
			<MyOrderCard
				key={order.id}
				id={order.id}
				customerName={order.customer}
				notes={order.notes}
				totalCost={order.totalCost}
				totalItems={order.totalItems}
				showCheck={true}
				isChecked={order.done ? 'checked' : 'unchecked'}
				onClick={() => router.navigate(`dashboardTab/pickupOrderPage/${order.id}`)}
			/>
		)});
};



export default function OrderPickup() {
	const [searchTxt, setSearchTxt] = useState('');
	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isVisible, setVisible] = useState(true)


	const handleDeleteFinished = async () => {
		Alert.alert(
			"Confirm Delete",
			"Are you sure you want to delete all finished orders? This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Delete", style: "destructive", onPress: async () => {
						await deleteFinishedOrders();
						// Call loadOrders to refresh the list after deletion
						router.back()
					}},
			]
		);
	};

	const loadOrders = async () => {
		try {
			setLoading(true)
			const fetchedOrders = await fetchOrders();
			setOrders(fetchedOrders);
		} catch (error) {
			console.error("Error fetching orders:", error);
			// Handle error, e.g., display an error message to the user
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {

		loadOrders();
	}, []);

	useEffect(() => {
		console.log(orders)
	}, [orders]);

	useFocusEffect(
		useCallback(() => {
			// Re-fetch data on focus
			(
				async () => {
					await loadOrders()
				}
			)()

			return () => {};
		}, [])
	);


	if (loading) {
		return (
			<BackDrop title={'Order Pickup'} mainHeader={false}>
				<ActivityIndicator size="large" color="blue" />
			</BackDrop>
		);
	}

	return (
		<BackDrop title={'Order Pickup'} mainHeader={false}>
			<MySeachBar
				placeholder={'Search'}
				value={searchTxt}
				onChangeText={setSearchTxt}
				style={{ marginBottom: 20 }}
			/>

			<View style={{rowGap: 10}}>
				<OrderList orders={orders} />
			</View>

			<LocalFAB
				visible={isVisible}
				actions={[{
					icon: "delete",
					label: "Delete Finished Orders",
					onPress: () => handleDeleteFinished()
				}]}
				icon={['plus', 'close']}
			/>
		</BackDrop>
	);
}