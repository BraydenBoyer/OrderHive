import {Tabs, useLocalSearchParams} from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '../styles/themes/colors/lightTheme.jsx';
import TabBarIcon from '../../components/TabBarIcon.jsx';
import {basicTabOptions} from "../styles/basicScreenStyling.jsx";
import {createContext, useContext, useState} from "react";
import {MyFAB} from "../../components/FAB.jsx";


export const AppContext = createContext({});

export default function TabLayout() {

	const [fabVisibility, setFabVisible] = useState(false)
	const [icon, setIcon] = useState(['plus', 'close'])
	const [actions, setActions] = useState(undefined)


	return (
		<PaperProvider theme={lightTheme}>
			<AppContext.Provider value={{setFabVisible, setIcon, setActions}}>
				<Tabs
					screenOptions={basicTabOptions}
				>

					<Tabs.Screen
						name="collaboratorTab"
						options={{
							title: 'collab',
							tabBarIcon: ({ color }) => (
								<TabBarIcon name="cloud" color={color} />
							),
						}}
					/>

					<Tabs.Screen
						name="customerTab"
						options={{
							title: 'customer',
							tabBarIcon: ({ color }) => (
								<TabBarIcon name="cloud" color={color} />
							),
						}}
					/>

					<Tabs.Screen
						name="inventoryTab"
						options={{
							title: 'inventory',
							tabBarIcon: ({ color }) => (
								<TabBarIcon name="settings" color={color} />
							),
						}}
					/>

					<Tabs.Screen
						name="dashboardTab"
						options={{
							title: 'Dashboard',
							tabBarIcon: ({ color }) => (
								<TabBarIcon name="stop" color={color} />
							),
						}}
					/>

					<Tabs.Screen name={'menuTab'} options={{href: null}} />

				</Tabs>

				<MyFAB actions={actions} icon={icon} visible={fabVisibility} />
			</AppContext.Provider>
		</PaperProvider>
	);
}

