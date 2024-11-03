import {StyleSheet, View} from "react-native";
import {BackDrop} from "../components/overlays/Backdrop.jsx";
import {Header} from "../components/overlays/BackHeader.jsx";
import {Redirect, router} from "expo-router";
import {Button, Text, TextInput, useTheme} from "react-native-paper";
import {MyTextInput} from "../components/inputs/MyTextInput.jsx";
import {MyButton} from "../components/inputs/MyButton.jsx";
import {roundness} from "./styles/themes/roundness/roundness.jsx";
import {useState} from "react";


export default function LoginPage() {

	const colors = useTheme().colors
	const styles = fileStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


	return(

		<BackDrop header={false}>

			<View style={styles.topView}>
				<Text variant={'displayMedium'} style={{alignSelf: "center"}} >
					Welcome Back!
				</Text>
				<Text variant={'bodyMedium'} style={{alignSelf: 'center'}}>
					Please enter your credentials
				</Text>
			</View>


			<View style={styles.middleView}>
				<MyTextInput placeholder={'User Name'} value={username} onChangeText={setUsername} />
				<MyTextInput placeholder={'Password'} value={password} onChangeText={setPassword} />
				<MyButton
					title={'Login'}
					style={styles.button}
					onClick={() => console.log(`Clicked Login. Username: ${username}. Password: ${password}`)}
					variant={'titleMedium'}
					elevation={2}
				/>
			</View>

			<View style={styles.bottomView}>
				<MyButton
					title={'Forgot Password? Too bad.'}
					style={styles.clearButton}
					onClick={() => console.log("Clicked Forgot Password")}
					variant={'bodyMedium'}
					elevation={0}
				/>
			</View>

			<Button buttonColor={colors.secondaryContainer} onPress={() => router.replace('dashboardTab')}>Dev Door</Button>

		</BackDrop>

	)
}



const fileStyles = () => {

	const colors = useTheme().colors

	return StyleSheet.create({
		button: {
			alignSelf: 'center',
			height: 50,
			width: '100%',
			flex: 0,
			backgroundColor: colors.primary,
			borderRadius: roundness.largeRadius,
		},

		clearButton: {
			alignSelf: 'center',
			height: 50,
			width: '100%',
			flex: 0,
			backgroundColor: 'transparent',
			borderRadius: roundness.largeRadius,
		},

		middleView: {
			rowGap: 15,
			paddingHorizontal: 10
		},

		topView: {
			marginVertical: 75
		},

		bottomView: {
			marginTop: 40,
			paddingHorizontal: 10,
			flex: 1
		}
	})
}