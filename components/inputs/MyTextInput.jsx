import {TextInput, useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";

/*
 *  MyTextInput: A functional component that renders a styled TextInput component from react-native-paper.
 *  Props:
 *      - placeholder: Placeholder text for the TextInput.
 *      - value: Current value of the TextInput.
 *      - onChangeText: Set function to handle text input changes.
 */
export const MyTextInput = ({placeholder, value, onChangeText, editable, style, keyboardType}) => {

	const styles = textInputStyles()
	const colors = useTheme().colors

	return(

		<TextInput
			label={placeholder}
			mode={'flat'}
			style={[styles.box, style]}
			cursorColor={colors.onPrimaryContainer}
			underlineColor={'transparent'}
			textColor={colors.onPrimaryContainer}
			value={value}
			onChangeText={onChangeText}
			activeUnderlineColor={colors.onPrimaryContainer}
			editable={editable}
			keyboardType={keyboardType}
		/>
	)
}


const textInputStyles = () => {

	const colors = useTheme().colors


	return StyleSheet.create({

		box: {
			borderRadius: roundness.mediumRadius,
			borderTopLeftRadius: roundness.mediumRadius,
			borderTopRightRadius: roundness.mediumRadius,
			backgroundColor: colors.primaryContainer,
		}
	})
}