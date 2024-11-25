import {MySurface} from "./MySurface.jsx";
import {StyleSheet, View} from "react-native";
import {globalVariable} from "../app/_layout.jsx";
import {Checkbox, Chip, Text, TouchableRipple} from "react-native-paper";
import {fonts} from '../app/styles/themes/fonts/fonts.jsx'
import {roundness} from "../app/styles/themes/roundness/roundness.jsx";


export const InventoryCard = ({
	title,
	inventory,
	claimed,
	retail,
	wholesale = 0,
	metadata,
	checkboxVisible,
	checkboxStatus,
	onCheckboxPress,
	onPress,
	onClick = () => {},
}) => {


	const styles = fileStyle()
	const colors = globalVariable.colors

	return(
		<MySurface>
			<TouchableRipple borderless={true} style={styles.card} onPress={onClick}>
				<View>
					<View style={styles.topContainer}>

						<View style={styles.topLeftContainer}>
							{
								checkboxVisible ?
									<Checkbox
										status={checkboxStatus}
										onPress={onCheckboxPress}
									/>
									:
									<></>
							}

							<Text variant={'headlineMedium'}>
								{title}
							</Text>
						</View>

						<View style={styles.topRightContainer}>
							<Text variant={'labelLarge'}>
								Inventory: {inventory}
							</Text>
							<Text variant={'labelLarge'}>
								Claimed: {claimed}
							</Text>
						</View>
					</View>

					<View style={styles.middleContainer}>
						{
							wholesale === 0 ?
								<></>
								:
								<Chip
									compact={true}
									textStyle={{fontSize: 14}}
								>
									Wholesale: ${wholesale}
								</Chip>
						}
						<Chip
							compact={true}
							textStyle={{fontSize: 14}}
						>
							Retail: ${retail}
						</Chip>
					</View>
				</View>
			</TouchableRipple>
		</MySurface>
	)
}


const fileStyle = () => {

	const colors = globalVariable.colors

	return StyleSheet.create({

		card: {
			padding: 15,
			rowGap: 5,
			borderRadius: roundness.mediumRadius
		},

		topContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},

		topLeftContainer: {
			flexDirection: 'row',
			columnGap: 5
		},

		topRightContainer: {
			flexDirection: 'column',
			alignItems: 'flex-end'
		},

		middleContainer: {
			flexDirection: 'row',
			columnGap: 5
		},

		bottomContainer: {
			flexDirection: 'row',
			columnGap: 5,
		},
	})
}