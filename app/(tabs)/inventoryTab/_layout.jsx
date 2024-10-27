import {Stack} from "expo-router";
import {basicScreenOption} from "../../../StylesTemp/basicScreenStyling.jsx";


export default function StackLayout() {

	return (

		<Stack screenOptions={basicScreenOption} >

			<Stack.Screen name={'index'} />
			<Stack.Screen name={'stackPage'} />

		</Stack>
	)
}