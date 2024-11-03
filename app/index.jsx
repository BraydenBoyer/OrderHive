import {StyleSheet, View} from "react-native";
import {BackDrop} from "../components/overlays/Backdrop.jsx";
import {Header} from "../components/overlays/BackHeader.jsx";
import {router} from "expo-router";
import {Button, Icon, Portal, Snackbar, Text, TextInput, useTheme} from "react-native-paper";
import {MyTextInput} from "../components/inputs/MyTextInput.jsx";
import {MyButton} from "../components/inputs/MyButton.jsx";
import {roundness} from "./styles/themes/roundness/roundness.jsx";
import {useEffect, useState} from "react";
import {emailLogin} from "./firebase/authentication.js";




const interpretLoginError = (error) => {

	let response = 'Login error. Please try again.'

	if (error === 'auth/invalid-email'){
		response = 'Incorrect email. Please try again.'
	}
	else if (error === 'auth/missing-password') {
		response = 'Missing password. Please try again.'
	}
	else if (error === 'auth/invalid-credential') {
		response = 'Incorrect password. Please try again.'
	}

	return response
}

const toDashboard = () => {
	router.navigate('./dashboardTab')
}

const toCreateUser = () => {
	router.navigate('/createUser')
}

export default function LoginPage() {

	const colors = useTheme().colors
	const styles = fileStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const [isVisibleSnack, setIsVisibleSnack] = useState(false)

	const [errorCode, setErrorCode] = useState('')
	const [loginErrorString, setLoginErrorString] = useState('')

	const resetSnack = () => {
		setErrorCode('')
		setLoginErrorString('')
		setIsVisibleSnack(false)
	}

	useEffect(() => {

		if (errorCode === '') return
		else if (errorCode === '0') {
			toDashboard()
			return
		}

		setLoginErrorString(interpretLoginError(errorCode))
		setIsVisibleSnack(true)
	}, [errorCode]);

	return(

		<BackDrop header={false}>

			<View style={styles.topView}>
				<Text variant={'displayMedium'} style={{textAlign: "center"}} >
					Welcome Back!
				</Text>

                <Icon size={50} source={'bee'} />

				<Text variant={'bodyMedium'} style={{alignSelf: 'center'}}>
					Please enter your credentials
				</Text>
			</View>


			<View style={styles.middleView}>
				<MyTextInput placeholder={'Email'} value={email} onChangeText={setEmail} />
				<MyTextInput placeholder={'Password'} value={password} onChangeText={setPassword} />
				<MyButton
					title={'Login'}
					style={styles.button}
					onClick={() => emailLogin(email, password, setErrorCode)}
					variant={'titleMedium'}
					elevation={2}
				/>
			</View>

			<View style={styles.bottomView}>
				<MyButton
					title={'New? Create an account!'}
					style={styles.clearButton}
					onClick={() => toCreateUser()}
					variant={'bodyMedium'}
					elevation={0}
					iconLeft={'new-box'}
				/>
				<MyButton
					title={'Forgot Password? Too bad.'}
					style={styles.clearButton}
					onClick={() => console.log("Clicked Forgot Password")}
					variant={'bodyMedium'}
					elevation={0}
					iconLeft={'bee'}
				/>
			</View>

			<Button buttonColor={colors.secondaryContainer} onPress={() => router.replace('dashboardTab')}>Dev Door</Button>

			<Portal>
				<Snackbar
					visible={isVisibleSnack}
					onDismiss={() => resetSnack()}
					duration={4000}
				>
					{loginErrorString}
				</Snackbar>
			</Portal>

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
			marginVertical: 75,
			alignItems: 'center'
		},

		bottomView: {
			marginTop: 40,
			paddingHorizontal: 10,
			flex: 1
		}
	})
}