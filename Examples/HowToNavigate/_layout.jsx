import {Stack, Tabs} from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import {basicScreenOption} from "../StylesTemp/basicScreenStyling.jsx";
import {lightTheme} from "../StylesTemp/themes/lightTheme.jsx";

export default function AppLayout() {
	return (
		<PaperProvider theme={lightTheme}>
			<Stack screenOptions={basicScreenOption}>
				<Stack.Screen name={'(tabs)'}/>
			</Stack>
		</PaperProvider>
	);
}