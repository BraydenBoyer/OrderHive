import {Stack, Tabs} from 'expo-router';
import {PaperProvider, MD3Theme, MD3LightTheme} from 'react-native-paper';
import {basicScreenOption} from "./styles/basicScreenStyling.jsx";
import {lightTheme} from "./styles/themes/colors/lightTheme.jsx";
import initializeFirebase from "./firebase/initializeFirebase.js";

export default function RootLayout() {


	return (
		<PaperProvider theme={lightTheme}>
			<Stack screenOptions={basicScreenOption}>
				<Stack.Screen name={'index'} />
				<Stack.Screen name={'(createUser)/createUser'} />
				<Stack.Screen name={'(tabs)'}/>
			</Stack>
		</PaperProvider>
	);
}