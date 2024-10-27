import {lightTheme} from "./themes/lightTheme.jsx";


export const basicScreenOption = {
	headerShown: false,
	navigationBarHidden: false,
	navigationBarColor: lightTheme.colors.surfaceVariant,
	statusBarColor: lightTheme.colors.surfaceVariant,
	statusBarStyle: 'dark',
}

export const basicTabOptions = {
	headerShown: false,
	navigationBarHidden: false,
	navigationBarColor: lightTheme.colors.surfaceVariant,
	tabBarActiveTintColor: 'red',
	tabBarStyle: {
		backgroundColor: lightTheme.colors.surfaceVariant,
		paddingBottom: 10,
		paddingTop: 10,
		height: 60
	}
}

export const basicBackdropStyle = {

	paddingVertical: 10,
	paddingHorizontal: 10,
	backgroundColor: lightTheme.colors.surface,
	flex: 1,
}

