import React from 'react'
import { createStackNavigator } from '@react-navigation/native-stack';
import DashScreen from "../../app/(tabs)/dashboard";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


const DashStack = createNativeStackNavigator()

const DashStackNavigation = () => {

	return(
		<DashStack.Navigator initialRouteName={'DashStack'}>
			<DashStack.Screen name={'DashScreen'} component={DashScreen} />
		</DashStack.Navigator>
	)
}


export default DashStackNavigation