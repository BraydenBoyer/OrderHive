import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../../app/(tabs)/homeScreen.jsx";
import DetailsScreen from "../../app/(tabs)/detailsScreen.jsx";
import {theme} from "../../constants/theme.jsx";
import {Text} from "react-native";

// ...

const Tab = createMaterialBottomTabNavigator();

const colors = theme.colors

const TabBarIcon = ({ focused, color, name }) => (
	<Ionicons name={name} size={24} color={focused ? 'white' : 'black'} />
);



export default function BottomNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="HomeScreen"
			activeColor={'black'}
			shifting={false}
			inactiveColor={'gray'}
			barStyle={{ backgroundColor: colors.background, }}
		>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
				}}
			/>
			<Tab.Screen
				name="DetailScreen"
				component={DetailsScreen}
				options={{
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="list" />,
				}}
			/>
		</Tab.Navigator>
	);
}