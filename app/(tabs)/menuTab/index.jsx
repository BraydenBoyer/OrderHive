import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Button} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import React, {useCallback, useContext} from "react";
import {AppContext} from "../_layout.jsx";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";

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

			<View style={{alignItems: "center",flexDirection: 'column', justifyContent: 'center',flex: 1}}>
				<View style={{alignContent: 'center',paddingTop: 5}}>

					<Button onPress={ () => router.navigate('menuTab/userDetails')} style={{backgroundColor: lightTheme.colors.primaryContainer,paddingHorizontal: 15, borderRadius: 8,
						opacity: 1,height: 75,width: 375,borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderBottomWidth:.5,borderBottomColor:'white',paddingVertical:20,}}>
						<Text style={styles.text}>User Details</Text>
					</Button>




					<Button onPress={ () => router.navigate('menuTab/CompanyDetails')}style={{backgroundColor:lightTheme.colors.primaryContainer,paddingHorizontal: 15, borderRadius: 8,
						opacity: 1,height: 75,width: 375,borderTopLeftRadius: 0,borderTopRightRadius: 0,paddingVertical:20,marginBottom:20}}>
						<Text style={styles.text}>Company Details</Text>
					</Button>

				</View>

				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/Collaborators')} style={styles.button}>
						<Text style={styles.text}>Collaborators</Text> </Button>
				</View>


				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/SubscriptionPlan')} style={styles.button }><Text style={styles.text}>Subscription Plan</Text></Button>
				</View>

				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/Appearance')} style={styles.button }><Text style={styles.text}>Appearance</Text></Button>
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
		marginBottom: 20,
		paddingHorizontal: 15,
		paddingVertical: 20,
		backgroundColor:  lightTheme.colors.primaryContainer,
		borderRadius: 8,
		alignItems: 'center',
		opacity: 1,
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