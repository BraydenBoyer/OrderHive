import {Stack} from "expo-router";
import {basicScreenOption} from "../../styles/basicScreenStyling.jsx";


export default function StackLayout() {


	return (

		<Stack screenOptions={basicScreenOption} >
			<Stack.Screen name={'index'} />
			<Stack.Screen name={'userDetails'} />
			<Stack.Screen name={'Appearance'} />
			<Stack.Screen name={'CompanyDetails'} />
			<Stack.Screen name={'SubscriptionPlan'} />
			<Stack.Screen name={'Collaborators'} />
		</Stack>

	)
}