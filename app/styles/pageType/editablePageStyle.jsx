import {StyleSheet} from "react-native";
import {lightTheme} from "../themes/colors/lightTheme.jsx";
import {globalVariable} from "../../_layout.jsx";
import {roundness} from "../themes/roundness/roundness.jsx";

export const editablePageStyle = StyleSheet.create({

	text: {
		fontSize: 20,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: lightTheme.colors.black,
	},
	title: {
		fontSize: 45,
		fontWeight: 'bold',
		textAlign: 'left',
	},


	container: {
		flexDirection: 'column',
		rowGap: 20
	},

	backgroundContainer: {
		flexDirection: 'column',
	},
	inputContainer: {
		flexDirection: 'row',
		backgroundColor: globalVariable.colors.primaryContainer,
		borderRadius: roundness.mediumRadius,
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	textInput: {
		flex: 1, // Take up available space
	},

	button: {
		flexShrink: 1
	}
});

