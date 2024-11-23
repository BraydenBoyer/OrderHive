import {StyleSheet, View} from "react-native";
import {Checkbox, Chip, Text, TouchableRipple} from "react-native-paper";
import {MySurface} from "./MySurface.jsx";
import {globalVariable} from "../app/_layout.jsx";
import {roundness} from "../app/styles/themes/roundness/roundness.jsx";


export const CustomerCard = ({

	name,
	totalCost,
	openOrders,
	assembledOrders,
	notes,
	metadata,
	checkboxVisible,
	checkboxStatus,
	onCheckboxPress,
	onClick = () => {},
 }) => {


	const styles = fileStyle()

	return(

		<MySurface>
			<TouchableRipple style={styles.card} borderless={true} onPress={onClick} >
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
								{name}
							</Text>
						</View>

						<View style={styles.topRightContainer}>
							<Text variant={'labelLarge'}>
								Open Orders: {openOrders}
							</Text>
							<Text variant={'labelLarge'}>
								Assembled: {assembledOrders}
							</Text>
						</View>
					</View>

					<View style={styles.middleContainer}>

						<Chip
							compact={true}
							textStyle={{fontSize: 14}}
						>
							Total: ${totalCost}
						</Chip>

						{
							notes.length < 1 ?
								<></>
								:
								<Chip
									compact={true}
									textStyle={{fontSize: 14}}
									style={{
										flexShrink: 1
									}}
								>
									Notes: {notes}
								</Chip>
						}

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
			columnGap: 5,
			overflow: 'hidden',
			borderRadius: roundness.smallRadius,
			marginTop: 5,
		},

		bottomContainer: {
			flexDirection: 'row',
			columnGap: 5,
		},
	})
}