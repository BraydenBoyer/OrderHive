import { Tabs } from 'expo-router';

export default function AppLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="index" options={{ title: 'Home' }} />
			<Tabs.Screen name="inventory" options={{ title: 'Inventory' }} />
		</Tabs>
	);
}