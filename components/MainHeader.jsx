import * as React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {router} from "expo-router";
import {useState} from "react";
import SideBar from "./SideBar.jsx";
import {lightTheme} from "../app/styles/themes/colors/lightTheme.jsx";

export const MainHeader = ({children,  title = 'App.OrderHive' }) => {

	const [open, setOpen] = useState(false)
	const colors = useTheme().colors

	const handleSettingsPress = () => {

		router.replace('/menuTab')
	}

	return (
		<>
			<Appbar.Header style={{backgroundColor: colors.primaryContainer}} elevated={true}>
				<Appbar.Action icon={'menu'} color={colors.onPrimaryContainer}  onPress={() => setOpen(!open)} />
				<Appbar.Content color={colors.onPrimaryContainer} title={title} />
				<Appbar.Action color={colors.onPrimaryContainer} icon={'cog'} onPress={handleSettingsPress} />

				<SideBar open={open} setOpen={setOpen} />
			</Appbar.Header>
		</>
	);
};
