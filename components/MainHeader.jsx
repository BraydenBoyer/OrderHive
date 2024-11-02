import * as React from 'react';
import { Appbar } from 'react-native-paper';
import {router} from "expo-router";
import {useState} from "react";
import SideBar from "./SideBar.jsx";

export const MainHeader = ({children,  title = 'App.OrderHive' }) => {

	const [open, setOpen] = useState(false)

	const handleSettingsPress = () => {

		router.replace('/menuTab')
	}

	return (
		<>
			<Appbar.Header elevated={true}>
				<Appbar.Action icon={'menu'} onPress={() => setOpen(!open)} />
				<Appbar.Content title={title} />
				<Appbar.Action icon={'cog'} onPress={handleSettingsPress} />
			</Appbar.Header>

		</>
	);
};
