import {Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../components/Backdrop.jsx";


export default function IndexPage(){
	return(

		<BackDrop style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>This is the index page</Text>
		</BackDrop>
	)
}