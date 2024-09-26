import * as React from 'react';
import 'react-native-reanimated';
import {pageStyle} from "@/styles/page";
import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "@/app/_appNavigator";
import {theme} from "@/constants/theme";
import {PaperProvider, useTheme} from "react-native-paper";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {useEffect, useState} from "react";



SplashScreen.preventAutoHideAsync()

const loadFonts = async () => {
	await Font.loadAsync({
		'Arial': require('../assets/fonts/Arial.ttf'),
		'Allura': require('../assets/fonts/Allura-Regular.otf')
	});
};


export default function App() {

	const [fontsloaded, setFontsLoaded] = useState(false)

	useEffect(() => {
		const prepare = async () => {
			try {
				await loadFonts();
			} catch (e) {
				console.warn(e);
			} finally {
				setFontsLoaded(true);
				// Hide the splash screen once fonts are loaded
				await SplashScreen.hideAsync();
			}
		};

		prepare().then(r => ({}));
	}, []);



	return (

		<PaperProvider theme={theme} settings={{rippleEffectEnabled: true}}>
			<NavigationContainer independent={true} >
				<SafeAreaView style={pageStyle.base}>
					<AppNavigator />
				</SafeAreaView>
			</NavigationContainer>
		</PaperProvider>
	)
}