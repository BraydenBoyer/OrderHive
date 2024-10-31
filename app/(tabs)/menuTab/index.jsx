import {BackDrop} from "../../../components/Backdrop.jsx";
import {Text,View} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";

export default function MenuPage() {

	return (

		<BackDrop>
			<View style={{alignItems: "center",flexDirection: 'column', justifyContent: 'center',flex: 1}}>
				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/userDetails')} style={{backgroundColor: "red",borderRadius: 7
						, width: 300,height: 50}}>User Details</Button>

					<Button onPress={ () => router.navigate('menuTab/CompanyDetails')} style={{backgroundColor: "yellow",borderRadius: 7
						, width: 300,height: 50}}>Company Details</Button>
				</View>

				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/Collaborators')} style={{backgroundColor: "blue",borderRadius: 7
						, width: 300,height: 50}}>Collaborators</Button>
				</View>


				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/SubscriptionPlan')} style={{backgroundColor: "gray",borderRadius: 7
						, width: 300,height: 50}}>Subscription Plan</Button>
				</View>

				<View style={{alignContent: 'center'}}>
					<Button onPress={ () => router.navigate('menuTab/Appearance')} style={{backgroundColor: "green",borderRadius: 7
						, width: 300,height: 50,justifyContent: 'center'}}>Appearance</Button>
				</View>

			</View>

		</BackDrop>
	)
}


/*
const styles = StyleSheet.create({
	alignItems: 'center',
	justifyContent: 'center',
})
*/