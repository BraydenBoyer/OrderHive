import {Tabs, useLocalSearchParams} from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '../styles/themes/lightTheme.jsx';
import TabBarIcon from '../../components/TabBarIcon.jsx';
import {basicTabOptions} from "../styles/basicScreenStyling.jsx";
import {createContext, useContext, useState} from "react";
import {MyFAB} from "../../components/FAB.jsx";


export const AppContext = createContext({});

export default function AppLayout() {

	const [fabVisibility, setFabVisible] = useState(false)


	return (
		<PaperProvider theme={lightTheme}>
			<AppContext.Provider value={{setFabVisible}}>
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

					<Tabs.Screen name={'(TestingSpace)/index'} options={{href: null}} />
					<Tabs.Screen name={'menuTab'} options={{href: "menuTab"}} />

				</Tabs>

				<MyFAB visible={fabVisibility} />
			</AppContext.Provider>
		</PaperProvider>
	);
}