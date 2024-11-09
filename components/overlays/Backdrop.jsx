import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { PaperProvider, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { basicBackdropStyle } from '../../app/styles/basicScreenStyling.jsx';
import {MyFAB} from "./FAB.jsx";
import {BackHeader} from "./BackHeader.jsx";
import {MainHeader} from "./MainHeader.jsx";
import {StatusBar} from "expo-status-bar";


/*
	This component is essentially the screen wrapper (It MUST BE USED on every screen). It creates a designated and scrollable safe area for
	the screen's UI. It also holds the header and FAB components.

	props:

	- children:
	   The screen's HTML is held here. It should not be set.

	- style:
		Stylizes the view if needed. Functions the same as other style props. Optional.

	- title (required, string):
		The title name

	- mainHeader (required, boolean):
		Boolean for sub page or main page.

	- Header (boolean):
		True if you want a header. False if not.

	@author Miles Hoffman
 */
export const BackDrop = ({ children, style, mainHeader = true, title = 'App.OrderHive', header = true }) => {
	const colors = useTheme().colors;


	return (
		<SafeAreaView style={[basicBackdropStyle]} >
			{ !header ? <></> : mainHeader ?
				<MainHeader title={title}/>
				:
				<BackHeader title={title}/>
			}
			<ScrollView style={{width: '100%'}} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false} horizontal={false}>
				<View style={[{padding: 10, flex: 1 }, style]}>

					{children}

				</View>
			</ScrollView>
		</SafeAreaView>
	);
};







