const colors = {
	primary: '#007FFF', // Primary color for interactive elements like buttons and links

	onPrimary: '#FFFFFF', // Color used for text/icons displayed on top of the primary color

	primaryContainer: '#D0EFFF', // Container color for primary elements

	onPrimaryContainer: '#00215A', // Color used for text/icons on top of primary containers

	// =======================================================================================

	secondary: '#4A6373', // Secondary color for less prominent interactive elements

	onSecondary: '#FFFFFF', // Color used for text/icons displayed on top of the secondary color

	secondaryContainer: '#D1E4F5', // Container color for secondary elements

	onSecondaryContainer: '#081D2B', // Color for text/icons on top of secondary containers

	// =======================================================================================

	tertiary: '#006D5B', // Tertiary color for accents and additional interactive elements

	onTertiary: '#FFFFFF', // Color for text/icons on top of the tertiary color

	tertiaryContainer: '#8EF2DA', // Container color for tertiary elements

	onTertiaryContainer: '#00211A', // Color for text/icons on top of tertiary containers

	// ========================================================================================

	error: '#B3261E', // Color used to indicate errors

	onError: '#FFFFFF', // Color for text/icons on top of the error color

	errorContainer: '#F9DEDC', // Container color for error elements

	onErrorContainer: '#410E0B', // Color for text/icons on top of error containers

	background: '#FFFBFE', // Background color for the main content area

	onBackground: '#1C1B1F', // Color for text/icons on top of the background

	surface: '#FFFBFE', // Surface color for cards, sheets, and menus

	onSurface: '#1C1B1F', // Color for text/icons on top of surface elements

	surfaceVariant: '#E7E0EC', // Variant surface color for subtle visual separation

	onSurfaceVariant: '#49454F', // Color for text/icons on top of surface variant elements

	outline: '#79747E', // Outline color for components like dividers and borders

	outlineVariant: '#CAC4D0', // Variant outline color for less prominent outlines

	shadow: '#000000', // Color used for shadows

	scrim: '#000000', // Color used for scrim overlays (e.g., modal backgrounds)

	inverseSurface: '#313033', // Surface color for dark mode or inverse themes

	inverseOnSurface: '#F4EFF4', // Color for text/icons on top of inverse surfaces

	inversePrimary: '#90CFFF', // Primary color for dark mode or inverse themes

	elevation: { // Elevation colors for creating depth and visual hierarchy
		level0: 'transparent',
		level1: 'rgb(248, 242, 251)',
		level2: 'rgb(244, 236, 248)',
		level3: 'rgb(240, 231, 246)',
		level4: 'rgb(239, 229, 245)',
		level5: 'rgb(236, 226, 243)',
	},

	surfaceDisabled: 'rgba(1C, 1B, 1F, 0.12)', // Color for disabled surface elements

	onSurfaceDisabled: 'rgba(1C, 1B, 1F, 0.38)', // Color for text/icons on top of disabled surfaces

	backdrop: 'rgba(29, 27, 31, 0.4)', // Color for backdrop elements (e.g., modal backgrounds)

	black: '#000000', // Black color

	white: '#ffffff'  // White color
};

export const lightTheme = {
	colors
}