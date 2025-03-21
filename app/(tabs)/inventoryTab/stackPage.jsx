import {Link, Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";


export default function InventoryPage(){
	return(

		<BackDrop style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>This is the stack page. Purely for testing navigation.</Text>
			<Button title={'Inventory'} onPress={ () => router.navigate('(tabs)/inventoryTab') } />
			<Link href={'inventoryTab/index'} />
		</BackDrop>
	)
}

