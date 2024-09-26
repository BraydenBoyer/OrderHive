import {ThemeProp} from "react-native-paper/lib/typescript/types";


export const colors = {
	primary: "#1E3614",
	onPrimary: "#CAE7BE",
	primaryContainer: "#90A87F",
	onPrimaryContainer: "#CAE7BE",
	secondary: "#141E36",
	onSecondary: "#BECAE7",
	secondaryContainer: "#627FC5",
	onSecondaryContainer: "#D3DBEF",
	tertiary: "#36141E",
	onTertiary: "#E7BECA",
	tertiaryContainer: "#FF0000",
	onTertiaryContainer: "#FF0000",
	error: "rgb(186, 26, 26)",
	onError: "rgb(255, 255, 255)",
	errorContainer: "rgb(255, 218, 214)",
	onErrorContainer: "rgb(65, 0, 2)",
	background: "#A8D794",
	onBackground: "#F2F9EF",
	surface: "rgb(255, 251, 255)",
	onSurface: "rgb(28, 28, 23)",
	surfaceVariant: "rgb(229, 227, 209)",
	onSurfaceVariant: "rgb(72, 71, 59)",
	outline: "rgb(121, 120, 105)",
	outlineVariant: "rgb(201, 199, 182)",
	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	inverseSurface: "rgb(49, 49, 43)",
	inverseOnSurface: "rgb(244, 240, 232)",
	inversePrimary: "rgb(200, 206, 68)",
	elevation: {
		level0: "transparent",
		level1: "rgb(247, 243, 242)",
		level2: "rgb(242, 239, 235)",
		level3: "rgb(237, 234, 227)",
		level4: "rgb(236, 233, 224)",
		level5: "rgb(233, 230, 219)"
	},
	surfaceDisabled: "rgba(28, 28, 23, 0.12)",
	onSurfaceDisabled: "rgba(28, 28, 23, 0.38)",
	backdrop: "rgba(49, 49, 37, 0.4)",
	rippleColor: '#E5F2F0',
}

export const settings = {
	standardRadius: 15,
	smallRadius: 5,
	largeRadius: 25,
}


export const theme: ThemeProp = {
	colors: colors,

	dark: false,

	version: 3,

	roundness: settings.smallRadius,

	animation: {
		scale: 1,
		defaultAnimationDuration: 1,
	},

	fonts: {
		default: {
			fontFamily: 'Arial',
			fontStyle: 'normal',
			fontWeight: 'normal',
		},

		labelLarge: {
			fontFamily: 'Arial',
			fontWeight: 'normal',
			fontSize: 14,
		},

		bodyLarge: {
			fontFamily: 'Arial',
			fontWeight: 'normal',
			fontSize: 40,
		},

		bodyMedium: {
			fontFamily: 'Arial',
			fontWeight: 'normal',
			fontSize: 18,
		},

		bodySmall: {
			fontFamily: 'Arial',
			fontWeight: 'normal',
			fontSize: 12,
		},

		titleLarge: {
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: 40,
		},

		titleMedium: {
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: 18,
		},

		titleSmall: {
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: 12,
		},

	}
}




/*
	primary: "#1E3614",
	onPrimary: "#CAE7BE",
	primaryContainer: "rgb(229, 234, 93)",
	onPrimaryContainer: "rgb(28, 29, 0)",
	secondary: "#141E36",
	onSecondary: "#BECAE7",
	secondaryContainer: "rgb(188, 233, 255)",
	onSecondaryContainer: "rgb(0, 31, 42)",
	tertiary: "#36141E",
	onTertiary: "#E7BECA",
	tertiaryContainer: "rgb(157, 248, 152)",
	onTertiaryContainer: "rgb(0, 34, 4)",
	error: "rgb(186, 26, 26)",
	onError: "rgb(255, 255, 255)",
	errorContainer: "rgb(255, 218, 214)",
	onErrorContainer: "rgb(65, 0, 2)",
	background: "#A8D794",
	onBackground: "#F2F9EF",
	surface: "rgb(255, 251, 255)",
	onSurface: "rgb(28, 28, 23)",
	surfaceVariant: "rgb(229, 227, 209)",
	onSurfaceVariant: "rgb(72, 71, 59)",
	outline: "rgb(121, 120, 105)",
	outlineVariant: "rgb(201, 199, 182)",
	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	inverseSurface: "rgb(49, 49, 43)",
	inverseOnSurface: "rgb(244, 240, 232)",
	inversePrimary: "rgb(200, 206, 68)",
	elevation: {
		level0: "transparent",
		level1: "rgb(247, 243, 242)",
		level2: "rgb(242, 239, 235)",
		level3: "rgb(237, 234, 227)",
		level4: "rgb(236, 233, 224)",
		level5: "rgb(233, 230, 219)"
	},
	surfaceDisabled: "rgba(28, 28, 23, 0.12)",
	onSurfaceDisabled: "rgba(28, 28, 23, 0.38)",
	backdrop: "rgba(49, 49, 37, 0.4)"
 */