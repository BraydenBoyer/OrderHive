import {BackDrop} from "../../../components/Backdrop.jsx";
import {Text,View} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";

export default function MenuPage() {


	return (

		<BackDrop>
			<View style={{alignItems: "center"}}>
				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/userDetails')} style={{backgroundColor: "red",borderRadius: 7
						, width: 133,}}>User Details</Button>
				</View>

				<View style={{alignContent: 'center'}}>
					<Button style={{backgroundColor: "blue",borderRadius: 7
						, width: 133}}>User Details</Button>
				</View>

			</View>
			<Text> MENUUU</Text>
		</BackDrop>
	)
}