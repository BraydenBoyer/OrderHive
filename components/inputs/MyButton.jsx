import {Button, Surface, Text, TextInput, TouchableRipple, useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";
import {lightTheme} from "../../app/styles/themes/colors/lightTheme.jsx";


export const MyButton = ({elevation, style = {height: 50, width: 50}, title = 'Button', onClick, variant = 'bodyMedium'}) => {

	const styles = inputStyles()
	const colors = useTheme().colors

	return(

		<Surface
			style={style}
			elevation={elevation}
			mode={'elevated'}
		>
			<TouchableRipple
				onPress={onClick}
				style={[style]}
				underlayColor={'red'}
				borderless={true}
				rippleColor={colors.backdrop}
			>
				<Text
					style={{ flex: 0, margin: 'auto' }}
					variant={variant}
				>
					{title}
				</Text>
			</TouchableRipple>
		</Surface>

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