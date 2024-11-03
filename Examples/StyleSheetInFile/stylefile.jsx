import {Tabs} from "expo-router";
import {Text, StyleSheet} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {router} from 'expo-router'
import {BackDrop} from "../../components/overlays/Backdrop.jsx";


export default function InventoryPage(){
	return(

		<BackDrop style={styleExample}>
			<Text>This is the Inventory page</Text>
			<Button style={{ backgroundColor: 'green'}} onPress={ () => router.navigate('inventoryTab/stackPage') }>
				TestingPagee
			</Button>
		</BackDrop>
	)
}



const styleExample = StyleSheet.create({
	alignItems: 'center',
	justifyContent: 'center'
})

