import {Tabs, useLocalSearchParams} from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '../styles/themes/colors/lightTheme.jsx';
import TabBarIcon from '../../components/TabBarIcon.jsx';
import {basicTabOptions} from "../styles/basicScreenStyling.jsx";
import {createContext, useContext, useState} from "react";


export const AppContext = createContext({});

export default function TabLayout() {

	const [fabVisibility, setFabVisible] = useState(false)
	const [icon, setIcon] = useState(['plus', 'close'])
	const [actions, setActions] = useState(undefined)


	return (

			<Tabs
				screenOptions={basicTabOptions}
			>

				<Tabs.Screen
					name="dashboardTab"
					options={{
						title: 'Dashboard',
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="dashboard" color={color} />
						),
					}}
				/>

				<Tabs.Screen
					name="customerTab"
					options={{
						title: 'Customer',
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="handshake" color={color} />
						),
					}}
				/>

				<Tabs.Screen
					name="inventoryTab"
					options={{
						title: 'Inventory',
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="inventory" color={color} />
						),
					}}
				/>

				<Tabs.Screen
					name="collaboratorTab"
					options={{
						title: 'Collaborator',
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="groups" color={color} />
						),
					}}
				/>

				<Tabs.Screen name={'menuTab'} options={{href: null}} />

			</Tabs>
	);
}

