import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PaperProvider, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { basicBackdropStyle } from '../StylesTemp/basicScreenStyling.jsx';

export const BackDrop = ({ children, style }) => {
	const colors = useTheme().colors;

	return (
		<SafeAreaView style={[basicBackdropStyle]} >
			<ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false} horizontal={false}>
				<View style={[{padding: 10}, style]}>
					{children}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
