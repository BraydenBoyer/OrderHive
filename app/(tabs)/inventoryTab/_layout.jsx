import {Stack} from "expo-router";
import {basicScreenOption} from "../../../StylesTemp/basicScreenStyling.jsx";
import {PaperProvider, useTheme} from "react-native-paper";


export default function StackLayout() {

	return (
		<PaperProvider theme={useTheme()}>
			<Stack screenOptions={basicScreenOption} >

				<Stack.Screen name={'index'} />
				<Stack.Screen name={'stackPage'} />

			</Stack>
		</PaperProvider>

	)
}