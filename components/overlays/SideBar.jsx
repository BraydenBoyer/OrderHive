import * as React from 'react';
import {Portal, Surface, Text, useTheme, Drawer} from 'react-native-paper';
import { Modal, TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import {getUserOrgs} from "../../app/firebase/user/userFunctions.js";
import {globalVariable} from "../../app/_layout.jsx";
import {router, useNavigation} from "expo-router";

const setGlobalOrg = (orgName, setOpen) => {

	setOpen(false)
	globalVariable.currentOrg = orgName
	console.log('Changed current org to: ', globalVariable.currentOrg)
	router.dismissAll()
	router.navigate('/dashboardTab')
}


export default function SideBar({ open, setOpen }) {

	const colors = useTheme().colors

	const HandleGetOrgs = () => {

		const orgs = globalVariable.allOrgs

		return orgs.map((org) => (
			<Drawer.Item
				key={org} // Add a unique key for better list performance
				label={org}
				onPress={() => {
					setGlobalOrg(org, setOpen);
				}}
				icon={'note'}
			/>
		));
	};

	return (
		<Portal>
			{
				open
				&& ( // Conditionally render the overlay and sidebar
				<View>
					<TouchableOpacity style={styles.overlay} onPress={() => setOpen(false)} activeOpacity={.5} />
					<View style={styles.sidebar}>
						<Surface mode={"elevated"} style={[styles.sidebarSurface, {backgroundColor: colors.primaryContainer} ]} >

							<Drawer.Section style={styles.section}  title="Organizations" showDivider={true} >

								<HandleGetOrgs/>

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