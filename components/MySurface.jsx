import {Surface} from "react-native-paper";
import {StyleSheet} from "react-native";
import {roundness} from "../app/styles/themes/roundness/roundness.jsx";
import {globalVariable} from "../app/_layout.jsx";


export const MySurface = ({children, style}) => {

	const fileStyle = styles()

	return(
		<Surface
			mode={'flat'}
			style={[fileStyle.surface, style]}
		>
			{children}
		</Surface>
	)
}



const styles = () => {

	const colors = globalVariable.colors

	return StyleSheet.create({
		surface: {
			borderRadius: roundness.mediumRadius,
			backgroundColor: colors.primaryContainer
		}
	})
}