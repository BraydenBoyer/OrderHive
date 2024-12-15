import {Stack} from "expo-router";
import {basicScreenOption} from "../../styles/basicScreenStyling.jsx";
import {PaperProvider, useTheme} from "react-native-paper";
import { createStackNavigator } from '@react-navigation/stack';
import CustomerPage from './index';
import ModifyCustomer from './ModifyCustomer';


export default function StackLayout() {
const Stack = createStackNavigator();
	return (

			<Stack.Navigator screenOptions={basicScreenOption}>
                  <Stack.Screen name="index" component={CustomerPage} />
                  <Stack.Screen name="ModifyCustomer" component={ModifyCustomer} />
                </Stack.Navigator>
	)
}


