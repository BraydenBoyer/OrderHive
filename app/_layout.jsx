import * as React from 'react';
import 'react-native-reanimated';
import BottomNavigator from "../components/navigation/bottomNavigation.jsx";
import {PaperProvider, useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {useEffect, useState} from "react";
import {pageStyle} from "../styles/page.jsx";
import {NavigationContainer} from "@react-navigation/native";


SplashScreen.preventAutoHideAsync()

// Loading fonts...?
const loadFonts = async () => {
	await Font.loadAsync({
		'Arial': require('../assets/fonts/Arial.ttf'),
		'Allura': require('../assets/fonts/Allura-Regular.otf')
	});
};


export default function App() {

	// Not sure atm
	const [fontsloaded, setFontsLoaded] = useState(false)
	const theme = useTheme()

	// supposedly loading fonts...
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
		<PaperProvider settings={{rippleEffectEnabled: true}}>
			<NavigationContainer independent={true} theme={theme} >
				<SafeAreaView style={pageStyle.base}>
					<BottomNavigator />
				</SafeAreaView>
			</NavigationContainer>
		</PaperProvider>
	)
}