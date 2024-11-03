import {View} from "react-native";
import {BackDrop} from "../components/Backdrop.jsx";
import {Header} from "../components/BackHeader.jsx";
import {Redirect, router} from "expo-router";
import {Button, Text, TextInput} from "react-native-paper";
import {MyTextInput} from "../components/inputs/MyTextInput.jsx";
import {MyButton} from "../components/inputs/MyButton.jsx";


export default function LoginPage() {



	return(

		<BackDrop header={false}>

			<View style={{
				marginVertical: 75
			}}>
				<Text variant={'displayMedium'} style={{alignSelf: "center"}} >
					Welcome Back!
				</Text>
				<Text variant={'bodyMedium'} style={{alignSelf: 'center'}}>
					Please enter your credentials
				</Text>
			</View>


			<View style={{
				rowGap: 15,
				paddingHorizontal: 10
			}}>
				<MyTextInput placeholder={'User Name'} />
				<MyTextInput placeholder={'Password'} />

			</View>



			<Button onPress={() => router.replace('dashboardTab')}>to dashboard</Button>

		</BackDrop>

	)
}