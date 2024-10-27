import {BackDrop} from "../../components/Backdrop.jsx";
import {ScrollView} from "react-native-web";
import {Text} from "react-native-paper";


export default function TestPage() {


	return (

		<BackDrop>
			<ScrollView>
				<Text>Hi</Text>
			</ScrollView>
		</BackDrop>
	)
}