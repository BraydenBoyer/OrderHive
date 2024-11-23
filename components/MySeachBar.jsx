import {Searchbar} from "react-native-paper";
import {StyleSheet} from "react-native";
import {globalVariable} from "../app/_layout.jsx";


export const MySeachBar = ({
	style,
	placeholder,
	value,
	onChangeText,
	onIconPress,
	loading,
}) => {

	const styles = fileStyle()

	return (

		<Searchbar
			mode={'bar'}
			onChangeText={onChangeText}
			value={value}
			style={[styles.bar, style]}

			loading={loading}
		/>
	)
}



const fileStyle = () => {

	const colors = globalVariable.colors

	return StyleSheet.create({

		bar: {
			backgroundColor: colors.secondaryContainer,
		}
	})
}