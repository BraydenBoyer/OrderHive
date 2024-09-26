import { string } from "prop-types";
import { Button, Divider, useTheme } from 'react-native-paper';
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {colors, settings} from "@/constants/theme";

interface SegmentButtonProp {
	labels: string[];
	selected: string; // Add selected prop
	onSelect: (label: string) => void; // Add onSelect prop
}

const MySegmentButton = ({ labels, onSelect, selected }: SegmentButtonProp) => {

	const theme = useTheme();

	const getButtonStyle = (label: string, isLast: boolean, isFirst: boolean) => {
		return [
			styles.button,
			isLast && styles.lastButton,
			isFirst && styles.firstButton,
			label === selected && styles.selectedButton // Apply selected button styles
		];
	};

	return (
		<View>
			{labels.map((label, index) => (
				<View key={label}>
					<Button
						mode={'text'}
						onPress={() => {onSelect(label)}}
						theme={theme}
						style={getButtonStyle(label, index === labels.length - 1, index === 0)}
						contentStyle={styles.buttonContent}
					>
						{label}
					</Button>

					{index < labels.length - 1 && <Divider />}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 0,
		height: 100,
		backgroundColor: colors.onPrimaryContainer
	},
	buttonContent: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
	},
	lastButton: {
		borderBottomRightRadius: settings.standardRadius,
	},
	firstButton: {
		borderTopRightRadius: settings.standardRadius,
	},
	selectedButton: {
		backgroundColor: colors.primaryContainer, // Highlight color for selected button
	}
});

export default MySegmentButton;
