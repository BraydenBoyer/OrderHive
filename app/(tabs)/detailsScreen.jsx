import React, {useEffect} from 'react';
import {View, Text, Button, StatusBar, StatusBarProps } from 'react-native';
import {pageStyle} from "../../styles/page.jsx";


export default function DetailsScreen({navigation, route}) {

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