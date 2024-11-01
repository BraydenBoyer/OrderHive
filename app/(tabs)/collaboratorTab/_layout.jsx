import {router, Stack, useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {basicScreenOption} from "../../styles/basicScreenStyling.jsx";
import {useRoute} from "@react-navigation/native";


export default function StackLayout() {


	const navigation = useNavigation();
	const router = useRouter();
	const params = useLocalSearchParams();
	const { id = 42, other } = params;






	return (

		<Stack screenOptions={basicScreenOption} >
			<Stack.Screen name={'index'} />
		</Stack>
	)
}