import {Stack, Tabs} from 'expo-router';
import {PaperProvider, MD3Theme, MD3LightTheme} from 'react-native-paper';
import {basicScreenOption} from "./styles/basicScreenStyling.jsx";
import {lightTheme} from "./styles/themes/colors/lightTheme.jsx";
import initializeFirebase from "./firebase/initializeFirebase.js";
import {StatusBar} from "expo-status-bar";

export default function RootLayout() {


	//Work on status bar here?

	return (
		<PaperProvider theme={lightTheme}>
			<Stack screenOptions={basicScreenOption}>
				<Stack.Screen name={'index'} />
				<Stack.Screen name={'(login)/createUser'} />
				<Stack.Screen name={'(login)/joinOrgPage'} />
				<Stack.Screen name={'(login)/createOrgPage'} />
				<Stack.Screen name={'(tabs)'}/>
			</Stack>
		</PaperProvider>
	);
}