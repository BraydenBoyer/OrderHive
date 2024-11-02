import {BackDrop} from "../../../components/Backdrop.jsx";
import {Text} from "react-native";
import {useRoute} from "@react-navigation/native";
import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../_layout.jsx";
import {useFocusEffect} from "expo-router";


export default function CollaboratorPage() {

	const {setFabVisible} = useContext(AppContext)

	useFocusEffect(
		useCallback(() => {
			// If you want to do something when screen is focused
			setFabVisible(false)

			return () => {
				// If you want to do something when screen is unfocused

			}
		}, [])
	)


	return (

		<BackDrop>
			<Text>Collab PAGE</Text>
		</BackDrop>
	)
}