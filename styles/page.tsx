import {Button, StyleSheet} from 'react-native'
import {colors, settings, theme} from "@/constants/theme";

export const pageStyle = StyleSheet.create({

	base: {
		flex: 1,
		backgroundColor: colors.background
	},

	body: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: colors.background
	}
})

export const homeStyle = StyleSheet.create({

	sideBarContainer: {
		flex: 1,
		maxWidth: 100,
		justifyContent: 'center',
	},

	fileCardContainer: {
		flex: 1,
		backgroundColor: colors.onBackground,
		marginTop: 5,
		marginBottom: 10,
		borderBottomLeftRadius: settings.largeRadius,
		borderTopLeftRadius: settings.largeRadius,
		overflow: "hidden",
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 4,
		elevation: 3,
	},

	fileCardScroll: {
		padding: 20,
	},

	fileCardScrollContent: {
		flexGrow: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 50,
	},

	fileCardRipple: {
		flex: 1,
		marginLeft: 0,
		borderBottomLeftRadius: settings.largeRadius,
		borderTopLeftRadius: settings.largeRadius,
		overflow: 'hidden',
	}
})