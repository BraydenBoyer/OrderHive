import {Appbar} from "react-native-paper";
import {Link, router} from "expo-router";
import SideBar from "./SideBar.jsx";
import * as React from "react";
import {lightTheme} from "../../app/styles/themes/colors/lightTheme.jsx";


export const BackHeader = ({title = 'App.OrderHive'}) => {


	const colors = lightTheme.colors

	const handleSettingsPress = () => {

		router.replace('/menuTab')
	}

	const goBack = () => {

		if( router.canGoBack() ){
			router.back()
		}
	}


	return(

		<Appbar.Header style={{backgroundColor: colors.primaryContainer}} elevated={true}>
			<Appbar.BackAction onPress={goBack} />
			<Appbar.Content color={colors.onPrimary} title={title} />
			<Appbar.Action color={colors.onPrimary} icon={'cog'} onPress={handleSettingsPress} />
		</Appbar.Header>
	)
}