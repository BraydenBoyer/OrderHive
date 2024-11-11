import {StyleSheet, View} from "react-native";
import {BackDrop} from "../../components/overlays/Backdrop.jsx";
import {Header} from "../../components/overlays/BackHeader.jsx";
import {router} from "expo-router";
import {Button, Icon, Portal, Snackbar, Text, TextInput, useTheme} from "react-native-paper";
import {MyTextInput} from "../../components/inputs/MyTextInput.jsx";
import {MyButton} from "../../components/inputs/MyButton.jsx";
import {roundness} from "./../styles/themes/roundness/roundness.jsx";
import {useEffect, useState} from "react";
import {createUser} from "../firebase/user/userFunctions.js";
import {creationPageStyles} from "../styles/pageType/creationPageStyles.jsx";


const handleCreateUser = async (email, password, number, name, setVisible, setSnackText) => {

	email = email.trim()
	password = password.trim()
	number = password.trim()
	name = name.trim()

    const res = await createUser(email, password, name, number)

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
	const styles = creationPageStyles()

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

				<MyButton
					title={'Cancel'}
					style={styles.button}
					onClick={() => router.back() }
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