import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '../../StylesTemp/themes/lightTheme.jsx';
import TabBarIcon from '../../components/TabBarIcon.jsx';
import {basicTabOptions} from "../../StylesTemp/basicScreenStyling.jsx";

export default function AppLayout() {
	return (
		<PaperProvider theme={lightTheme}>
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
					name="index"
					options={{
						title: 'Dashboard',
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="stop" color={color} />
						),
					}}
				/>

				<Tabs.Screen name={'(TestingSpace)/index'} options={{href: null}} />
				<Tabs.Screen name={'menuTab'} options={{href: null}} />

			</Tabs>
		</PaperProvider>
	);
}