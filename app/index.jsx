import {View} from "react-native";
import {BackDrop} from "../components/Backdrop.jsx";
import {Header} from "../components/BackHeader.jsx";
import {Redirect, router} from "expo-router";
import {Button, Text} from "react-native-paper";


export default function LoginPage() {




	return(

		<BackDrop>

			<Text>
				This is login screen.
			</Text>

			<Button style={{
				height: 100,
			}} mode={'elevated'} onPress={() => router.navigate('dashboardTab')}>
				Click here to go to dashboard
			</Button>

		</BackDrop>

	)
}