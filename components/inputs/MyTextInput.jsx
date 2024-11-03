import {TextInput, useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";


export const MyTextInput = ({placeholder}) => {

	const styles = textInputStyles()

	return(

		<TextInput
			placeholder={placeholder}
			mode={'flat'} style={styles.box}
			underlineColor={'transparent'}
		/>
	)
}


const textInputStyles = () => {

	const theme = useTheme()

	return StyleSheet.create({

		box: {
			borderRadius: roundness.mediumRadius,
			borderTopLeftRadius: roundness.mediumRadius,
			borderTopRightRadius: roundness.mediumRadius
		}
	})
}