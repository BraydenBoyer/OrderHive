import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {router, useFocusEffect} from "expo-router";
import React, {useCallback, useContext} from "react";
import {AppContext} from "../_layout.jsx";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import {Button} from 'react-native-paper'

export default function MenuPage() {

	const {setFabVisible} = useContext(AppContext)

	useFocusEffect(
		useCallback(() => {
			// If you want to do something when screen is focused
			setFabVisible(true)

			return () => {
				// If you want to do something when screen is unfocused

			}
		}, [])
	)



	return (

		<BackDrop>
			<View>
				<Text style={styles.title}>Menu</Text>
			</View>

			<View style={{alignItems: "center",flexDirection: 'column', justifyContent: 'center',rowGap:10}}>

				<View style={{alignContent: 'center',paddingTop: 5, rowGap: 1}}>

					<MyButton title={'User Details'} onClick={ () => router.navigate('menuTab/userDetails')} style={styles.button} />
					<MyButton title={"Company Details"} onClick={ () => router.navigate('menuTab/CompanyDetails')} style={styles.button} ></MyButton>

				</View>


				<View style={{alignContent: 'center'}}>
					<MyButton title={'Collaborators'} onClick={ () => router.navigate('menuTab/Collaborators')} style={styles.button}>
						<Text style={styles.text}>Collaborators</Text> </MyButton>
				</View>


				<View style={{alignContent: 'center'}}>

					<MyButton title={'SubscriptionPlan'} onClick={ () => router.navigate('menuTab/SubscriptionPlan')} style={styles.button }><Text style={styles.text}>Subscription Plan</Text></MyButton>
				</View>

				<View style={{alignContent: 'center'}}>
					<MyButton title={'Appearance'} onClick={ () => router.navigate('menuTab/Appearance')} style={styles.button }><Text style={styles.text}>Appearance</Text></MyButton>
				</View>

			</View>

		</BackDrop>
	)
}



const styles = StyleSheet.create({

	text: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: lightTheme.colors.black
	},
	title: {
		fontSize: 45,
		fontWeight: 'bold',
		textAlign: 'left',
	},

	button: {
		//marginBottom: 20,
		//paddingHorizontal: 15,
		//paddingVertical: 20,
		backgroundColor:  lightTheme.colors.primaryContainer,
		//borderRadius: 8,
		//alignItems: 'center',
		//opacity: 1,
		height: 75,
		width: 375
	},

	buttonWrapper:{
		marginBottom: 20,
		paddingHorizontal: 15,
		paddingVertical: 20,
		backgroundColor:  lightTheme.colors.primaryContainer,
		borderRadius: 8,
		alignItems: 'center',
		opacity: 1,
		height: 50,
		width: 375
	}
});