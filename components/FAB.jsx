import {FAB, Portal, useTheme} from 'react-native-paper'
import {useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import {lightTheme} from "../app/styles/themes/lightTheme.jsx";



/*
	This component is the Floating Action Button. It lets you add additional actions to the screen.
	As of now, you cannot add custom actions. However, you can add the component to your screen.

	@author Miles Hoffman
 */
export const MyFAB = ({actions, icon, visible}) => {

	const [state, setState] = useState({ open: false });
	const onStateChange = ({ open }) => setState({ open });
	const { open } = state;


	// ########################################### Testing Purposes


	const exampleActions = [
		{
			icon: 'plus',
			label: 'Plus Sign',
			onPress: () => { return console.log('Clicked FAB plus')},
			size: 'large'
		},
		{
			icon: 'cloud',
			label: '',
			onPress: () => { return console.log('Clicked FAB cloud')},
			size: 'large'
		},
		{
			icon: 'menu',
			label: 'menu sign',
			onPress: () => { return console.log('Clicked FAB Menu')},
			size: 'large'
		},
	]

	const exampleIcon = 'cloud'

	// #############################################


	return(
		<Portal>

			<FAB.Group
				open={open}
				visible={visible}
				icon={open ? exampleIcon : 'plus'}
				actions={exampleActions}
				onStateChange={onStateChange}

				style={{marginBottom: 60,}}
				fabStyle={{}}
			/>

		</Portal>
	)
}

