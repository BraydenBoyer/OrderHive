import React, {useEffect} from 'react';
import {View, Text, Button, StatusBar, StatusBarProps } from 'react-native';
import {DetailsScreenNavigationProp, RootStackParamList} from "@/constants/types";
import {RouteProp} from "@react-navigation/native";
import {pageStyle} from "@/styles/page";
import {useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "@/constants/theme";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";


type Props = {
	navigation: DetailsScreenNavigationProp
	route: RouteProp<RootStackParamList, 'DetailsScreen'>
}


export default function DetailsScreen({navigation, route}: Props) {

	const {name, age} = route.params || {}

	return (
		<View style={pageStyle.body}>
			<View style={{width: 300}}>
				<Text>
					Aww, {name} is learning how to switch screens.
				</Text>

				<Text style={{top: 50}}>
					The important files are _appNavigator, _layout, homeScreen, detailsScreen, and types
					(which is in the constants folder).
				</Text>
			</View>
			<Button
				title="Go to Home"
				onPress={() => navigation.navigate('HomeScreen')}
			/>
		</View>
	);
}