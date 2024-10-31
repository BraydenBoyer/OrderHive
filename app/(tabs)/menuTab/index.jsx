import {BackDrop} from "../../../components/Backdrop.jsx";
import {Text,View,StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";

export default function MenuPage() {

	return (

		<BackDrop>
			<View style={{alignItems: "center",flexDirection: 'column', justifyContent: 'center',flex: 1,}}>
				<View style={{alignContent: 'center', paddingBottom: 5}}>
					<Button onPress={ () => router.navigate('menuTab/userDetails')} style={{backgroundColor: "#353562",borderRadius: 7
						, width: 300,height: 50,justifyContent: 'center', borderBottomLeftRadius:0,borderBottomRightRadius:0}}><Text style={styles.text}>User Details</Text></Button>

					<Button onPress={ () => router.navigate('menuTab/CompanyDetails')} style={{backgroundColor: "#353562",borderRadius: 7
						, width: 300,height: 50, justifyContent: 'center',borderTopLeftRadius: 0,borderTopRightRadius: 0}}><Text style={styles.text}>Company Details</Text></Button>
				</View>

				<View style={{alignContent: 'center',paddingBottom: 5}}>
					<Button onPress={ () => router.navigate('menuTab/Collaborators')} style={{backgroundColor: "#353562",borderRadius: 7
						, width: 300,height: 50, justifyContent: 'center'}}> <Text style={styles.text}>Collaborators</Text> </Button>
				</View>


				<View style={{alignContent: 'center',paddingBottom: 5}}>
					<Button onPress={ () => router.navigate('menuTab/SubscriptionPlan')} style={{backgroundColor: "#353562",borderRadius: 7
						, width: 300,height: 50, justifyContent: 'center '}}><Text style={styles.text}>Subscription Plan</Text></Button>
				</View>

				<View style={{alignContent: 'center',paddingBottom: 5}}>
					<Button onPress={ () => router.navigate('menuTab/Appearance')} style={{backgroundColor: "#353562",borderRadius: 7
						, width: 300,height: 50,justifyContent: 'center'} }><Text style={styles.text}>Appearance</Text></Button>
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
});