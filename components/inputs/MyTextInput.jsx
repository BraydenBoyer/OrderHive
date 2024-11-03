import {TextInput, useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";


export const MyTextInput = ({placeholder, value, onChangeText}) => {

	const styles = textInputStyles()
	const colors = useTheme().colors

	return(

		<TextInput
			placeholder={placeholder}
			mode={'flat'}
			style={styles.box}
			underlineColor={'transparent'}
			activeUnderlineColor={'transparent'}
			cursorColor={colors.onPrimaryContainer}
			textColor={colors.onPrimaryContainer}
			value={value}
			onChangeText={onChangeText}
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
			backgroundColor: colors.primaryContainer
		}
	})
}