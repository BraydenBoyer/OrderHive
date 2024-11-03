import {FAB, Portal, useTheme} from 'react-native-paper'
import {useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import {lightTheme} from "../app/styles/themes/colors/lightTheme.jsx";



/*
	The MyFAB component is the Floating Action Button. It lets you add additional actions to the screen.

	Props:

	* actions (Required): Defines the possible actions after opening the fab.
	* icon (Optional): An array of two strings that define the open/close icon of the fab.
	* visibility (Required): A boolean to determine visibility.

	Requirements - You MUST:

	* Define the action and visibility prop for the FAB. (See example below for action)
	* SET THE PROPS with the useContext!!!

	You must NOT:

	* Create your own FAB component. This causes performance issues and overlay bugs. Unless you can fix it.

	@author Miles Hoffman
 */

const exampleActions = [
	{
		icon: 'plus',
		label: 'Plus Sign',
		onPress: () => { return console.log('Clicked FAB plus')},
		size: 'large',
		color: lightTheme.colors.secondary,
		style: {backgroundColor: lightTheme.colors.secondaryContainer}
	},
	{
		icon: 'cloud',
		label: '',
		onPress: () => { return console.log('Clicked FAB cloud')},
		size: 'large',

	},
	{
		icon: 'menu',
		label: 'menu sign',
		onPress: () => { return console.log('Clicked FAB Menu')},
		size: 'large'
	},
]

export const MyFAB = ({actions, icon = ['plus', 'close'], visible}) => {

	const [state, setState] = useState({ open: false });
	const onStateChange = ({ open }) => setState({ open });
	const { open } = state;




	return(
		<Portal>

			<FAB.Group
				open={open}
				visible={visible}
				icon={open ? icon[1] : icon[0]}
				actions={actions !== undefined ? actions : exampleActions}
				onStateChange={onStateChange}

				style={styleFab}
				variant={'primary'}
			/>

		</Portal>
	)
}


const styleFab = {
		marginBottom: 75
}

