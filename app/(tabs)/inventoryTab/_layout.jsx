import {Stack} from "expo-router";
import {basicScreenOption} from "../../styles/basicScreenStyling.jsx";
import {PaperProvider, useTheme} from "react-native-paper";


export default function StackLayout() {

	return (

			<Stack screenOptions={basicScreenOption} >

				<Stack.Screen name={'index'} />
				<Stack.Screen name={'stackPage'} />

			</Stack>
	)
}


