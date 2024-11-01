import {BackDrop} from "../../../components/Backdrop.jsx";
import {Text,View,StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";
import React from "react";

export default function MenuPage() {

	return (

		<BackDrop>
			<View>
				<Text style={styles.title}>Menu</Text>
			</View>

			<View style={{alignItems: "center",flexDirection: 'column', justifyContent: 'center',flex: 1}}>
				<View style={{alignContent: 'center',paddingTop: 5}}>
					<Button onPress={ () => router.navigate('menuTab/userDetails')} style={{backgroundColor:'#353562',paddingHorizontal: 15, borderRadius: 8, alignItems: 'center',
						opacity: 1,height: 75,width: 375,borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderBottomWidth:.5,borderBottomColor:'white',paddingVertical:20}}>
						<Text style={styles.text}>User Details</Text>
					</Button>

					<Button onPress={ () => router.navigate('menuTab/CompanyDetails')}style={{backgroundColor:'#353562',paddingHorizontal: 15, borderRadius: 8, alignItems: 'center',
						opacity: 1,height: 75,width: 375,borderTopLeftRadius: 0,borderTopRightRadius: 0,paddingVertical:20,marginBottom:20}}><Text style={styles.text}>Company Details</Text></Button>
				</View>

				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/Collaborators')} style={styles.button }>
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
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
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
		backgroundColor: '#353562',
		borderRadius: 8,
		alignItems: 'center',
		opacity: 1,
		height: 75,
		width: 375
	}
});