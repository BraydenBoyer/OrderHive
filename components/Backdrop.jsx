import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PaperProvider, useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {lightTheme} from "../StylesTemp/themes/lightTheme.jsx";
import {basicBackdropStyle} from "../StylesTemp/basicScreenStyling.jsx";

export const BackDrop = ({children, style}) => {

	const colors = useTheme().colors

	return (

		<SafeAreaView style={[
			basicBackdropStyle,
			style
		]}>
			<View>

				{children}

			</View>
		</SafeAreaView>
	);
}