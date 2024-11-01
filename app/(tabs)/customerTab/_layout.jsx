import {Stack} from "expo-router";
import {basicScreenOption} from "../../styles/basicScreenStyling.jsx";


export default function StackLayout() {


	return (

		<Stack screenOptions={basicScreenOption} >
			<Stack.Screen name={'index'} />
		</Stack>
	)
}