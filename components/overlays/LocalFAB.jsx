import {FAB, Portal} from "react-native-paper";
import {lightTheme} from "../../app/styles/themes/colors/lightTheme.jsx";
import {useEffect, useState} from "react";



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



/*
	The LocalFAB component is the Floating Action Button. It lets you add additional actions to the screen.

	Props:

	- Actions (Required, JSON):
		Defines the possible actions after opening the fab. See above for an example.

	- icon (string array):
		An array of two strings that define the open/close icon of the fab.

	- visibility (Required, boolean):
		A boolean to determine visibility.

	Notes:

	- Set the 'visible' prop to be false when the screen is not in focus.
 */
export const LocalFAB = ({actions, icon = ['plus', 'close'], visible}) => {

	const [state, setState] = useState({ open: false });
	const onStateChange = ({ open }) => setState({ open });
	const { open } = state;

	useEffect(() => {
		if( !visible ){
			setState({open: false})
		}
	}, [visible]);


	return (!visible) ?
		<></>
		:
		<>
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
		</>
}


const styleFab = {
	marginBottom: 75
}