import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { PaperProvider, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { basicBackdropStyle } from '../StylesTemp/basicScreenStyling.jsx';
import {MyFAB} from "./FAB.jsx";

export const BackDrop = ({ children, style }) => {
	const colors = useTheme().colors;

	return (
		<SafeAreaView style={[basicBackdropStyle]} >
			<ScrollView style={{width: '100%'}} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false} horizontal={false}>
				<View style={[{padding: 10, flex: 1 }, style]}>
					{children}
				</View>
				<MyFAB/>
			</ScrollView>
		</SafeAreaView>
	);
};

