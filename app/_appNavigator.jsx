import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)/homeScreen';
import DetailsScreen from './(tabs)/detailsScreen';
import {colors} from "../constants/theme.jsx";

const Stack = createNativeStackNavigator()


export default function AppNavigator() {

	const screenOptions = {
		headerShown: false,
		animation: 'fade',
		statusBarColor: colors.background,
		statusBarHidden: false,
		statusBarAnimation: 'fade',
		statusBarStyle: 'dark',
		navigationBarColor: colors.background,
		navigationBarHidden: false,

	}

	return(

		<Stack.Navigator screenOptions={screenOptions} initialRouteName={'HomeScreen'}>
			<Stack.Screen name={'HomeScreen'} component={HomeScreen} />
			<Stack.Screen name={'DetailsScreen'} component={DetailsScreen}/>
		</Stack.Navigator>
	)
}


