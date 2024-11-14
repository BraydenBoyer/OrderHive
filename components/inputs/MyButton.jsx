import {Button, Icon, Surface, Text, TextInput, TouchableRipple, useTheme} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";
import {lightTheme} from "../../app/styles/themes/colors/lightTheme.jsx";
import {buttonStyle} from "../../app/styles/components/inputs/buttons.jsx";


export const MyButton = ({
	elevation,
	style = {height: 50, width: 50},
	title = 'Button',
	onClick,
	variant = 'bodyMedium',
	iconLeft,
	iconRight,
}) => {

	const styles = inputStyles()
	const colors = useTheme().colors
	const fonts = useTheme().fonts

	const iconSize = fonts[variant].fontSize * 1.5

	return(

		<Surface
			style={[buttonStyle.basicButtonTemplate, style]}
			elevation={elevation}
			mode={'elevated'}
		>
			<TouchableRipple
				onPress={onClick}
				style={[buttonStyle.basicButtonTemplate, style]}
				underlayColor={'red'}
				borderless={true}
				rippleColor={colors.backdrop}
			>
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

					<Icon size={iconSize} source={iconLeft} />
					<Text variant={variant} style={{marginHorizontal: iconSize*.5}} >
						{title}
					</Text>
					<Icon size={iconSize} source={iconRight} />

				</View>
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