import {Stack} from "expo-router";
import {basicScreenOption} from "../../styles/basicScreenStyling.jsx";
import {PaperProvider, useTheme} from "react-native-paper";
import { createStackNavigator } from '@react-navigation/stack';
import InventoryPage from './index';
import ModifyItemPage from './ModifyItemPage';


export default function StackLayout() {
const Stack = createStackNavigator();
	return (

			<Stack.Navigator>
                  <Stack.Screen name="index" component={InventoryPage} />
                  <Stack.Screen name="ModifyItemPage" component={ModifyItemPage} />
                </Stack.Navigator>
	)
}


