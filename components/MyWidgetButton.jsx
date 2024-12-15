import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import {globalVariable} from "../app/_layout.jsx";
import {MyButton} from "./inputs/MyButton.jsx";

const colors = globalVariable.colors;

export const MyWidgetButton = ({ title, route }) => {
	return (
		<MyButton
			style={
				styles.button
			}
			onClick={() => router.navigate(route)}
			title={title}
			variant={'titleLarge'}
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 190,
		height: 150
	},
});