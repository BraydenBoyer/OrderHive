import {Stack, Tabs} from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import {basicScreenOption} from "./styles/basicScreenStyling.jsx";
import {lightTheme} from "./styles/themes/lightTheme.jsx";

export default function RootLayout() {
	return (
		<PaperProvider theme={lightTheme}>
			<Stack screenOptions={basicScreenOption}>
				<Stack.Screen name={'(tabs)'}/>
			</Stack>
		</PaperProvider>
	);
}