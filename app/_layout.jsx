import {Stack, Tabs} from 'expo-router';
import {PaperProvider, MD3LightTheme, useTheme, MD3Colors} from 'react-native-paper';
import {basicScreenOption} from "./styles/basicScreenStyling.jsx";
import {lightTheme} from "./styles/themes/colors/lightTheme.jsx";
import initializeFirebase from "./firebase/initializeFirebase.js";
import {StatusBar} from "expo-status-bar";
import {createContext, useState} from "react";

// Globally accessible variable
export const globalVariable = {
	currentOrg: '',
	colors: lightTheme.colors
}

// Returns a theme object with custom colors.
export const createTheme = (colors) => {

	return({
		...MD3LightTheme,
		colors: colors,
		myOwnProperty: true,
	});
}

// Propagates throughout the app
export const ThemeContext = createContext();

export default function RootLayout() {

	const [hiveTheme, setHiveTheme] = useState(createTheme(lightTheme.colors))

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