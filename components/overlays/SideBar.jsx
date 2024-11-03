import * as React from 'react';
import {Portal, Surface, Text, useTheme, Drawer} from 'react-native-paper';
import { Modal, TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';


export default function SideBar({ open, setOpen }) {

	const colors = useTheme().colors
	const [active, setActive] = React.useState('');

	return (
		<Portal>
			{open && ( // Conditionally render the overlay and sidebar
				<View>
					<TouchableOpacity style={styles.overlay} onPress={() => setOpen(false)} activeOpacity={.5} />
					<View style={styles.sidebar}>
						<Surface mode={"elevated"} style={[styles.sidebarSurface, {backgroundColor: colors.secondaryContainer} ]} >

							<Drawer.Section style={styles.section} title="OrderHive" showDivider={true} >
								<Drawer.Item
									label="First Item"
									onPress={() => setActive('first')}
									icon={'note'}
								/>
								<Drawer.Item
									label="Second Item"
									active={active === 'second'}
									onPress={() => setActive('second')}
									icon={'note'}
								/>
							</Drawer.Section>

						</Surface>
					</View>
				</View>
			)}
		</Portal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: '#000000',
		opacity: .5
	},

	sidebar: {
		width: 250,
		height: '100%',
	},

	sidebarSurface: {
		flex: 1,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20
	},

	section: {
		fontWeight: 'bold',
		fontSize: 20
	}
});