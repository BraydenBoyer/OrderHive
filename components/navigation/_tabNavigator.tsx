import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import DashStackNavigation from "@/components/navigation/dashStackNav";



const TabNavigator = createBottomTabNavigator()

export default function TabNavigation() {

    const screenOptions = {
        // Configure the screen options here

    }

    return (
         
         <TabNavigator.Navigator initialRouteName={'DashStack'} screenOptions={screenOptions}>
            <TabNavigator.Screen name={'DashStack'} component={DashStackNavigation}/>
         </TabNavigator.Navigator>
    )
}