import {globalVariable} from "../_layout.jsx";

const colors = globalVariable.colors

export const basicScreenOption = {
	headerShown: false,
	navigationBarHidden: false,
	navigationBarColor: '#000000',
	//statusBarColor: lightTheme.colors.primaryContainer,
	//statusBarStyle: 'dark',
}

export const basicTabOptions = {
	headerShown: false,
	tabBarActiveTintColor: colors.primary,
	tabBarInactiveTintColor: colors.onPrimaryContainer,
	tabBarStyle: {
		backgroundColor: colors.primaryContainer,
		height: 80,
	},

	tabBarItemStyle: {
		backgroundColor: colors.primaryContainer,
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
	backgroundColor: colors.surface,
	flex: 1,
	flexGrow: 1
}

