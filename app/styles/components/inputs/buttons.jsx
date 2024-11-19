import {StyleSheet} from "react-native";
import {roundness} from "../../themes/roundness/roundness.jsx";
import {useTheme} from "react-native-paper";
import {createTheme, globalVariable} from "../../../_layout.jsx";
import {lightTheme} from "../../themes/colors/lightTheme.jsx";


const colors = globalVariable.colors

export const buttonStyle = StyleSheet.create({

	basicButtonTemplate: {
		borderRadius: roundness.mediumRadius,
		minWidth: 75,
		minHeight: 50,
		backgroundColor: colors.primaryContainer
	},

	clearButtonTemplate: {
		backgroundColor: 'transparent',
		shadowColor: 'transparent'
	},

	clearButton: {
		alignSelf: 'center',
		height: 50,
		width: '100%',
		flex: 0,
		backgroundColor: 'transparent',
		borderRadius: roundness.mediumRadius,
	},
})