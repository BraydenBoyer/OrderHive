
export const colors = {
	// Primary color scheme
	primary: "#1976d2", // Main color for primary actions, buttons, and highlights
	onPrimary: "#ffffff", // Text color on primary backgrounds for contrast
	primaryContainer: "#bbdefb", // Background color for containers that hold primary content
	onPrimaryContainer: "#0d47a1", // Text color on primary containers for visibility

	// Secondary color scheme
	secondary: "#dc004e", // Main color for secondary actions and elements
	onSecondary: "#ffffff", // Text color on secondary backgrounds for contrast
	secondaryContainer: "#f8bbd0", // Background color for containers that hold secondary content
	onSecondaryContainer: "#880e4f", // Text color on secondary containers for visibility

	// Tertiary color scheme
	tertiary: "#ff9800", // Color for tertiary actions or accents
	onTertiary: "#ffffff", // Text color on tertiary backgrounds for contrast
	tertiaryContainer: "#ffe0b2", // Background color for containers that hold tertiary content
	onTertiaryContainer: "#e65100", // Text color on tertiary containers for visibility

	// Error color scheme
	error: "#f44336", // Main color for error messages and indicators
	onError: "#ffffff", // Text color on error backgrounds for contrast
	errorContainer: "#ffcccc", // Background color for error containers or alerts
	onErrorContainer: "#b71c1c", // Text color on error containers for visibility

	// Background and surface colors
	background: "#f5f5f5", // Default background color for application screens
	onBackground: "#212121", // Text color for content on the default background
	surface: "#ffffff", // Background color for cards, dialogs, and sheets
	onSurface: "#212121", // Text color for content on surfaces
	surfaceVariant: "#e0e0e0", // Background color for variant surfaces like cards with different styles
	onSurfaceVariant: "#424242", // Text color on variant surfaces for visibility

	// Outline colors
	outline: "#bdbdbd", // Outline color for borders, dividers, and text inputs
	outlineVariant: "#e0e0e0", // Outline color for secondary elements or inactive states

	// Shadow and scrim
	shadow: "rgba(0, 0, 0, 0.2)", // Shadow color for elevation effects on surfaces
	scrim: "rgba(0, 0, 0, 0.5)", // Overlay color for modal backdrops and dialogs

	// Inverse colors
	inverseSurface: "#424242", // Background color for dark mode surfaces
	inverseOnSurface: "#f5f5f5", // Text color for content on dark mode surfaces
	inversePrimary: "#90caf9", // Color for primary actions in dark mode

	// Elevation levels
	elevation: {
		level0: "transparent", // No elevation effect
		level1: "rgba(0, 0, 0, 0.05)", // Subtle elevation effect for low-level elements
		level2: "rgba(0, 0, 0, 0.1)", // Moderate elevation effect for medium-level elements
		level3: "rgba(0, 0, 0, 0.15)", // Stronger elevation effect for higher-level elements
		level4: "rgba(0, 0, 0, 0.2)", // Deeper elevation effect for prominent elements
		level5: "rgba(0, 0, 0, 0.25)"  // Maximum elevation effect for floating elements
	},
	surfaceDisabled: "rgba(0, 0, 0, 0.12)", // Color for disabled surfaces to indicate inactivity
	onSurfaceDisabled: "rgba(0, 0, 0, 0.38)", // Text color for disabled content for visibility
	backdrop: "rgba(0, 0, 0, 0.5)", // Overlay color for backdrop effects in modals and dialogs
	rippleColor: "#e0e0e0", // Color for ripple effects on button presses

	// Useful colors
	red: '#FF003B',
	green: '#29D667',
	blue: "#6631CE",

};


export const settings = {
	standardRadius: 15,
	smallRadius: 5,
	largeRadius: 25,
}


export const theme = {
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