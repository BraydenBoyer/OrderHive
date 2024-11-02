import {Appbar} from "react-native-paper";
import {Link, router} from "expo-router";


export const BackHeader = ({title = 'App.OrderHive'}) => {

	const handleSettingsPress = () => {

		router.replace('/menuTab')
	}

	const goBack = () => {

		if( router.canGoBack() ){
			router.back()
		}
	}


	return(
		<Appbar.Header>
			<Appbar.BackAction onPress={goBack} />
			<Appbar.Content title={title}  />
			<Appbar.Action icon={'cog'} onPress={handleSettingsPress} />
		</Appbar.Header>
	)
}