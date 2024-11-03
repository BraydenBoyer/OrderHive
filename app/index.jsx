import {StyleSheet, View} from "react-native";
import {BackDrop} from "../components/Backdrop.jsx";
import {Header} from "../components/BackHeader.jsx";
import {Redirect, router} from "expo-router";
import {Button, Text, TextInput, useTheme} from "react-native-paper";
import {MyTextInput} from "../components/inputs/MyTextInput.jsx";
import {MyButton} from "../components/inputs/MyButton.jsx";
import {roundness} from "./styles/themes/roundness/roundness.jsx";


export default function LoginPage() {

	const colors = useTheme().colors

	const styles = fileStyles()

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
				<MyButton
					title={'Login'}
					style={styles.button}
					onClick={() => console.log('hi')}
					variant={'bodyLarge'}
				/>
			</View>



			<Button onPress={() => router.replace('dashboardTab')}>to dashboard</Button>

		</BackDrop>

	)
}



const fileStyles = () => {

	const colors = useTheme().colors

	return StyleSheet.create({
		button: {
			height: 50,
			backgroundColor: colors.primary,
			borderRadius: roundness.largeRadius,
		}
	})
}