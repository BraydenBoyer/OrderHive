import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {router, useFocusEffect} from "expo-router";
import React, {useCallback, useContext} from "react";
import {AppContext} from "../_layout.jsx";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import {Button} from 'react-native-paper'
import {SelectionButtons} from "../../../components/inputs/SelectionButtons.jsx";

export default function MenuPage() {






	return (

		<BackDrop title={'Menu'} >

			<View style={{flexDirection: 'column', rowGap:10}}>

				<View style={{paddingTop: 5}}>

					<SelectionButtons
						onClick={() => router.navigate('menuTab/userDetails')}
						title={'User Details'}
						index={0}
						count={2}
					/>
					<SelectionButtons
						onClick={() => router.navigate('menuTab/CompanyDetails')}
						title={'Company Details'}
						index={1}
						count={2}
					/>

				</View>



				<View style={{alignContent: 'center'}}>
					<SelectionButtons
						title={'Subscriptions'}
						onClick={() => router.navigate('menuTab/SubscriptionPlan')}

					/>
				</View>

				<View style={{alignContent: 'center'}}>
					<SelectionButtons
						title={'Appearance'}
						onClick={() => router.navigate('menuTab/Appearance')}
					/>
				</View>

			</View>

		</BackDrop>
	)
}



const styles = StyleSheet.create({

	text: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: lightTheme.colors.black
	},
	title: {
		fontSize: 45,
		fontWeight: 'bold',
		textAlign: 'left',
	},

	button: {
		//marginBottom: 20,
		//paddingHorizontal: 15,
		//paddingVertical: 20,
		backgroundColor:  lightTheme.colors.primaryContainer,
		//borderRadius: 8,
		//alignItems: 'center',
		//opacity: 1,
		height: 75,
		width: 375
	},

	buttonWrapper:{
		marginBottom: 20,
		paddingHorizontal: 15,
		paddingVertical: 20,
		backgroundColor:  lightTheme.colors.primaryContainer,
		borderRadius: 8,
		alignItems: 'center',
		opacity: 1,
		height: 50,
		width: 375
	}
});