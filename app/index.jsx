import {StyleSheet, View} from "react-native";
import {BackDrop} from "../components/overlays/Backdrop.jsx";
import {router, useFocusEffect} from "expo-router";
import {Button, Icon, Portal, Snackbar, Text, useTheme} from "react-native-paper";
import {MyTextInput} from "../components/inputs/MyTextInput.jsx";
import {MyButton} from "../components/inputs/MyButton.jsx";
import {roundness} from "./styles/themes/roundness/roundness.jsx";
import {useCallback, useEffect, useState} from "react";
import {emailLogin, logoutCurrentUser} from "./firebase/user/authentication.js";
import {userHasOrg} from "./firebase/user/userFunctions.js";
import {fireAuth} from "./firebase/initializeFirebase.js";
import {creationPageStyles} from "./styles/pageType/creationPageStyles.jsx";
import {globalVariable} from "./_layout.jsx";


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

const toOrgSelection = () => {
	router.navigate('./selectOrgPage')
}

const toCreateUser = () => {
	router.navigate('/createUser')
}

export default function LoginPage() {

	const colors = useTheme().colors
	const styles = creationPageStyles()

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

		if (errorCode === ''){}
		else if (errorCode === '0') {

			(
				async () => {

					const hasOrg = await userHasOrg()

					// If the user has an org, they can log in
					if (hasOrg) {

						// Should send to org selection screen first
						toOrgSelection()
					}
					// If the user does not, they must join or create an org
					else {
						console.log("User has org: ", hasOrg)
						router.navigate('/joinOrgPage')
					}
				}
			)()
		}
		else{
			setLoginErrorString(interpretLoginError(errorCode))
			setIsVisibleSnack(true)
		}

		setErrorCode('')

	}, [errorCode]);


	useFocusEffect(
		useCallback(() => {

			(
				async () => {
					await logoutCurrentUser()
					globalVariable.currentOrg = ''
				}
			)()

		}, [])
	)


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

			<Button
				buttonColor={colors.secondaryContainer}
				onPress={() => emailLogin('admin@gmail.com', '1234abcd', setErrorCode)}
			>
				Dev Door
			</Button>

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