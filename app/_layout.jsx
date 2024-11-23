import {Stack, Tabs} from 'expo-router';
import {PaperProvider, MD3LightTheme, useTheme, MD3Colors} from 'react-native-paper';
import {basicScreenOption} from "./styles/basicScreenStyling.jsx";
import {lightTheme} from "./styles/themes/colors/lightTheme.jsx";
import initializeFirebase from "./firebase/initializeFirebase.js";
import {StatusBar} from "expo-status-bar";
import {createContext, useEffect, useState} from "react";
import {lightOrangeBlueColors} from "./styles/themes/colors/lightOrangeBlueColors.jsx";

// Globally accessible variable
export const globalVariable = {
	currentOrg: '',
	allOrgs: [],
	colors: lightOrangeBlueColors
}

// Returns a theme object with custom colors.
export const createTheme = (colors) => {

	globalVariable.colors = colors

	return({
		...MD3LightTheme,
		colors: colors,
		myOwnProperty: true,
	});
}

const setGlobalColor = (colors) => {
	globalVariable.colors = colors
}

// Propagates throughout the app
export const ThemeContext = createContext();

export default function RootLayout() {

	const materialColors = MD3LightTheme.colors
	let myTheme = lightOrangeBlueColors

	const [hiveTheme, setHiveTheme] = useState(createTheme(myTheme))


	//Work on status bar here?

	return (

		<ThemeContext.Provider value={{hiveTheme, setHiveTheme}}>
			<PaperProvider theme={hiveTheme}>
				<Stack screenOptions={basicScreenOption}>
					<Stack.Screen name={'index'} />
					<Stack.Screen name={'(login)/createUser'} />
					<Stack.Screen name={'(login)/joinOrgPage'} />
					<Stack.Screen name={'(login)/selectOrgPage'} />
					<Stack.Screen name={'(login)/createOrgPage'} />
					<Stack.Screen name={'(tabs)'}/>
				</Stack>
			</PaperProvider>
		</ThemeContext.Provider>
	);
}