import {Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../components/Backdrop.jsx";


export default function DashboardPage(){
	return(

		<BackDrop style={{alignItems: 'center', justifyContent: 'center'}}>
			<Text>This is the dashboard!!!!!</Text>
		</BackDrop>
	)
}