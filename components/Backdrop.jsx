import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { PaperProvider, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { basicBackdropStyle } from '../app/styles/basicScreenStyling.jsx';
import {MyFAB} from "./FAB.jsx";
import {BackHeader} from "./BackHeader.jsx";
import {MainHeader} from "./MainHeader.jsx";


/*
	This component is essentially the screen wrapper (It MUST BE USED on every screen). It creates a designated and scrollable safe area for
	the screen's UI. It also holds the header and FAB components.

	props:

	- children: the screen's HTML is held here. It should not be set.
	- style: stylizes the view if needed. Functions the same as other style props. Optional.

	@author Miles Hoffman
 */
export const BackDrop = ({ children, style, mainHeader = true, title = 'App.OrderHive' }) => {
	const colors = useTheme().colors;


	return (
		<SafeAreaView style={[basicBackdropStyle]} >
			{mainHeader ?
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







