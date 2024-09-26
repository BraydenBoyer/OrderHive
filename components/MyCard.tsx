import TouchableRippleNative from "react-native-paper/src/components/TouchableRipple/TouchableRipple.native";
import {GestureResponderEvent, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Button, Card, Divider, IconButton, Menu, Text} from "react-native-paper";
import React, {useState} from "react";
import {colors, settings, theme} from "@/constants/theme";
import moment from "moment";



type MyCardProps = {
	city: string,
	totalMoney: number,
	totalCustomers: number,
	date: string,
	details: string,
	selected: string,
	todayFilter: boolean
};


export const MyCard = ({todayFilter, selected, city, date, totalCustomers, totalMoney, details}: MyCardProps) => {

	const money = totalMoney.toFixed(2)
	const [visible, setVisible] = useState(false)
	const dateObj = moment(date, 'MM/DD/YY').toDate()
	const todaysDate = new Date().setUTCHours(0,0,0,0)
	const dateUTC = dateObj.setUTCHours(0,0,0,0)
	const isToday = dateUTC == todaysDate;


	const isTodayFilter = (selected === city || selected === 'All' || selected === 'Today')
		&& (todayFilter ? isToday : true);

	const cancelButtonPress = (event: GestureResponderEvent) => {
		event.stopPropagation()
	}

	const closeMenu = () => {setVisible(false)}
	const openMenu = () => (setVisible(true))

	return(

		isTodayFilter

		&&

		<View style={cardStyle.card}>
			<TouchableRippleNative rippleColor={colors.rippleColor} onPress={()=>{}} >
				<View style={cardStyle.content}>

					<TouchableWithoutFeedback onPress={(event)=>{cancelButtonPress(event)}}>
						<View style={cardStyle.headerContainer}>

							<Text variant={'bodySmall'} style={{paddingHorizontal: 10, color: colors.primaryContainer}}>
								{date}
							</Text>

							<Menu
								visible={visible}
								onDismiss={closeMenu}
								contentStyle={cardStyle.menuContent}
								style={cardStyle.menu}
								elevation={0}
								anchor={
									<IconButton
										onPress={openMenu}
										style={cardStyle.iconButton}
										icon={'menu'}
										iconColor={colors.onSecondary}
										rippleColor={colors.rippleColor}
									/>}
							>
								<Button
									onPress={()=>{}}
									mode={'text'}
									style={cardStyle.menuItem}
								>
									<Text variant={'bodyLarge'}>View Card</Text>
								</Button>
								<Button
									onPress={()=>{}}
									mode={'text'}
									style={cardStyle.menuItem}
								>
									<Text variant={'bodyLarge'}>No</Text>
								</Button>
								<Button
									onPress={()=>{}}
									mode={'text'}
									style={cardStyle.menuItem}
								>
									<Text variant={'bodyLarge'}>Delete</Text>
								</Button>
							</Menu>

						</View>
					</TouchableWithoutFeedback>

					<View style={cardStyle.titleContainer}>
						<Text style={{color: colors.primary}} variant={'titleLarge'}>
							{city}
						</Text>
					</View>

					<Card.Content style={cardStyle.subTitleContainer}>
						<Text variant={'bodyMedium'}>
							{totalCustomers + ' customers\n$' + money}
						</Text>
					</Card.Content>

					<Card.Content>
					    <Text>{details}</Text>
					</Card.Content>

				</View>
			</TouchableRippleNative>
		</View>
	)
}

const cardStyle = StyleSheet.create({
	card: {
		margin: 5,
		borderRadius: settings.standardRadius,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 4,
		elevation: 5,
		flexGrow: 1,
		minWidth: 160,
		maxWidth: 260,
		aspectRatio: 5 / 6,
		overflow: 'hidden'
	},
	content: {
		aspectRatio: 5 / 6,
		overflow: 'hidden',
		margin: 'auto',
	},
	titleContainer: {
		alignItems: 'center',
		margin: 20,
		paddingHorizontal: 10,
		paddingTop: 5,
	},
	subTitleContainer: {
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	headerContainer: {
		position: 'absolute',
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	iconButton: {
		padding: 0,
		width: 35,
		height: 35,
		color: 'black',
		borderRadius: settings.smallRadius,
	},
	menu: {
		backgroundColor: 'transparent',
	},
	menuContent: {
		backgroundColor: 'transparent',
		borderRadius: 0,
	},
	menuItem: {
		backgroundColor: colors.onSecondaryContainer,
		borderRadius: settings.smallRadius
	},
});