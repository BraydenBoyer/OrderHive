import {StyleSheet, View} from "react-native";
import {BackDrop} from "../../components/overlays/Backdrop.jsx";
import {Header} from "../../components/overlays/BackHeader.jsx";
import {router} from "expo-router";
import {Button, Icon, Portal, Snackbar, Text, TextInput, useTheme} from "react-native-paper";
import {MyTextInput} from "../../components/inputs/MyTextInput.jsx";
import {MyButton} from "../../components/inputs/MyButton.jsx";
import {roundness} from "./../styles/themes/roundness/roundness.jsx";
import {useEffect, useState} from "react";
import {emailLogin} from "./../firebase/authentication.js";
import {userCreation} from "../firebase/userCreation.js";



const handleCreateUser = async (email, password, number, name, setVisible, setSnackText) => {

    const res = await userCreation(email, password, name, number)

    if (res === true) {
        setVisible(false)
        router.navigate('/')
    }
    else if (res === 'Empty') {
        setSnackText('Fill in all of the fields.')
        setVisible(true)
    }
	else if (res === 'auth/invalid-email') {
        setSnackText('Invalid email. Try again.')
        setVisible(true)
    }
    else if (res === 'auth/weak-password') {
        setSnackText('Weak password. Must be more than 6 characters. Try again.')
        setVisible(true)
    }
    else if (res === 'auth/email-already-in-use') {
        setSnackText('That email is already being used. Try again.')
        setVisible(true)
    }
	else {
        setSnackText('User account creation error. Try again.')
        setVisible(true)
    }
}


export default function CreateUserPage() {

	const colors = useTheme().colors
	const styles = fileStyles()

	const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')

    const [snackText, setSnackText] = useState('')
    const [isVisible, setVisible] = useState(false)


	return(

		<BackDrop header={false}>

			<View style={styles.topView}>

                <Text variant={'displayMedium'} style={{textAlign: 'center'}} >
                    Welcome to OrderHive
                </Text>

				<Icon size={50} source={'bee'} />

				<Text variant={'bodyMedium'} style={{alignSelf: 'center'}}>
					Bee-ase enter your credentials
				</Text>
			</View>


			<View style={styles.middleView}>
                <MyTextInput placeholder={'Name'} onChangeText={setName} value={name} />
				<MyTextInput placeholder={'Email'} onChangeText={setEmail} value={email} />
				<MyTextInput placeholder={'Password'} onChangeText={setPassword} value={password} />
                <MyTextInput placeholder={'Phone Number'} onChangeText={setNumber} value={number} />

				<MyButton
					title={'Create Profile'}
					style={styles.button}
					onClick={() => handleCreateUser(email, password, number, name, setVisible, setSnackText) }
					variant={'titleMedium'}
					elevation={2}
				/>
			</View>

			<View style={styles.bottomView}>
				<MyButton
					title={'Yum yum'}
					style={styles.clearButton}
					onClick={() => {}}
					variant={'bodyMedium'}
					elevation={0}
					iconLeft={'bee'}
					iconRight={'bee'}
				/>
			</View>

			<Portal>
				<Snackbar duration={4000} visible={isVisible} onDismiss={() => setVisible(false)}>
                    {snackText}
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