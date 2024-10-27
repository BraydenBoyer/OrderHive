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
				initialRouteName={'inventoryTab'}
			>

				<Tabs.Screen
					name="(TestingSpace)/index"
					options={{
						title: 'Miles',
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
					name="dashboardTab/index"
					options={{
						title: 'Dashboard',
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="menu" color={color} />
						),
					}}
				/>

				<Tabs.Screen
					name="index"
					options={{
						title: 'Index',
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="stop" color={color} />
						),
					}}
				/>

			</Tabs>
		</PaperProvider>
	);
}