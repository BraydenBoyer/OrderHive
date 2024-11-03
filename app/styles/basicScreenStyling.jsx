import {lightTheme} from "./themes/colors/lightTheme.jsx";


export const basicScreenOption = {
	headerShown: false,
	navigationBarHidden: false,
	navigationBarColor: lightTheme.colors.primaryContainer,
	statusBarColor: lightTheme.colors.primaryContainer,
	statusBarStyle: 'dark',
}

export const basicTabOptions = {
	headerShown: false,
	tabBarActiveTintColor: lightTheme.colors.primary,
	tabBarInactiveTintColor: lightTheme.colors.onPrimaryContainer,
	tabBarStyle: {
		backgroundColor: lightTheme.colors.primaryContainer,
		height: 80,
	},

	tabBarItemStyle: {
		backgroundColor: lightTheme.colors.primaryContainer,
		paddingBottom: 10,
		paddingTop: 5,
	},

	tabBarIconStyle: {
		margin: 0,
		padding: 0
	},

	tabBarLabelStyle: {
		fontWeight: 'bold',
		fontSize: 12,
		marginBottom: 10
	}
}

export const basicBackdropStyle = {

	paddingVertical: 0,
	paddingHorizontal: 0,
	backgroundColor: lightTheme.colors.surface,
	flex: 1,
	flexGrow: 1
}

