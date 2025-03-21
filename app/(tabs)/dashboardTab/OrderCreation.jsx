import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { MySeachBar } from "../../../components/MySeachBar.jsx";
import {useState, useEffect, useCallback} from "react";
import { MyOrderCard } from "../../../components/MyOrderCard.jsx";
import { fetchOrders } from "../../firebase/orderFunctions.js";
import { ActivityIndicator, View } from 'react-native';
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
				onClick={() => router.navigate(`dashboardTab/orderPage/${order.id}`)}
			/>
	)});
};



export default function OrderCreation() {
	const [searchTxt, setSearchTxt] = useState('');
	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isVisible, setVisible] = useState(true)

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

	useFocusEffect(
		useCallback(() => {

			setVisible(true)
			loadOrders()

			return () => {
				setVisible(false)
			}
		}, [setVisible])
	)

	if (loading) {
		return (
			<BackDrop title={'Order Creation'} mainHeader={false}>
				<ActivityIndicator size="large" color="blue" />
			</BackDrop>
		);
	}

	return (
		<BackDrop title={'Order Creation'} mainHeader={false}>
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
						icon: "plus",
						label: "Create Order",
						onPress: () => router.navigate('dashboardTab/CreateOrder')
					}]}
				icon={['plus', 'close']}
			/>
		</BackDrop>
	);
}