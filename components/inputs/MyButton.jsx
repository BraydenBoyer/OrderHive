import {Button, Text, TextInput, TouchableRipple, useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";
import {lightTheme} from "../../app/styles/themes/colors/lightTheme.jsx";


export const MyButton = ({style = {height: 50, width: 50}, title = 'Button', onClick}) => {

	const styles = inputStyles()

	return(

		<TouchableRipple
			onPress={onClick}
			style={[style]}
			theme={lightTheme}
		>
			<Text>{title}</Text>
		</TouchableRipple>
	)
}


const inputStyles = () => {

	const theme = useTheme()

	return StyleSheet.create({

		box: {
			borderRadius: roundness.mediumRadius,
			borderTopLeftRadius: roundness.mediumRadius,
			borderTopRightRadius: roundness.mediumRadius
		}
	})
}