import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import {PaperProvider, useTheme, Text, Divider} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { basicBackdropStyle } from '../../app/styles/basicScreenStyling.jsx';
import {BackHeader} from "./BackHeader.jsx";
import {MainHeader} from "./MainHeader.jsx";
import {StatusBar} from "expo-status-bar";
import {globalVariable} from "../../app/_layout.jsx";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "expo-router";
import {logoutCurrentUser} from "../../app/firebase/user/authentication.js";


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
export const BackDrop = ({ children, style, mainHeader = true, title = 'App.OrderHive', header = true, showOrg = true }) => {

	const colors = useTheme().colors
	const [orgName, setOrgName] = useState('')

	useEffect(() => {
		setOrgName(globalVariable.currentOrg)
	}, [globalVariable.currentOrg]);


	return (
		<SafeAreaView style={[basicBackdropStyle]} >
			{ !header ? <></> : mainHeader ?
				<MainHeader title={title} />
				:
				<BackHeader title={title}/>
			}
			<ScrollView
				style={{width: '100%'}}
				contentContainerStyle={{flexGrow: 1, paddingBottom: 65}}
				showsVerticalScrollIndicator={false}
				horizontal={false}
			>
				<View style={[{padding: 10, flex: 1 }, style]}>

					{
						orgName.length < 1 || !header || !showOrg ?
							<></>
							:
							<View style={{marginTop: 10, marginBottom: 30, rowGap: 10}}>
								<Text variant={'displayMedium'} style={{textAlign: 'center'}}>
									{orgName}
								</Text>
								<Divider bold={true} style={{height: 2}} horizontalInset={true} />
							</View>
					}

					{children}

				</View>
			</ScrollView>
		</SafeAreaView>
	);
};







