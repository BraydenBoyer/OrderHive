import { MySurface } from "./MySurface.jsx";
import { StyleSheet, View } from "react-native";
import { globalVariable } from "../app/_layout.jsx";
import {Text, TouchableRipple, Chip, Checkbox} from "react-native-paper";
import { roundness } from "../app/styles/themes/roundness/roundness.jsx";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import {updateOrderStatus} from "../app/firebase/orderFunctions.js";

export const MyOrderCard = ({
	id,
    customerName,
    totalCost,
    notes,
    onClick = () => {},
	totalItems,
	showCheck = false,
	isChecked = 'checked',
}) => {

	const styles = fileStyle();

	const [checked, setChecked] = useState(isChecked)

	const toggleCheck = (oldCheck) => {
		oldCheck === 'checked' ? setChecked('unchecked') : setChecked('checked')

		updateOrderStatus(id, oldCheck !== 'checked')
	}

	useEffect(() => {

		isChecked = checked
	}, [checked]);

	return (
		<MySurface>
			<TouchableRipple borderless={true} style={styles.card} onPress={onClick}>
				<View>
					<View style={styles.topContainer}>
						<View style={{flexDirection: 'row', columnGap: 5}}>
							{
								showCheck &&
								<Checkbox
									status={checked}
									onPress={() => toggleCheck(checked)}
									uncheckedColor={'red'}
									color={'#2AD532'}
								/>
							}
							<Text variant={'headlineMedium'}>
								{customerName}
							</Text>
						</View>

						<Text variant={'labelLarge'}>
							Total: ${totalCost.toFixed(2)}
						</Text>
					</View>

					<View style={{flexDirection: 'row', columnGap: 5}}>
						{totalItems && (
							<View style={styles.notesContainer}>
								<Chip
									compact={true}
									textStyle={{ fontSize: 14 }}
									style={styles.notesChip}
								>
									Total Items: {totalItems}
								</Chip>
							</View>
						)}
						{notes && (
							<View style={styles.notesContainer}>
								<Chip
									compact={true}
									textStyle={{ fontSize: 14 }}
									style={styles.notesChip}
								>
									Notes: {notes}
								</Chip>
							</View>
						)}
					</View>

				</View>
			</TouchableRipple>
		</MySurface>
	);
};

const fileStyle = () => {
	return StyleSheet.create({
		card: {
			padding: 15,
			rowGap: 5,
			borderRadius: roundness.mediumRadius,
		},

		topContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},

		notesContainer: {
			marginTop: 8,
			alignItems: 'flex-start',
		},
		notesChip: {
			flexShrink: 1,
			maxWidth: '100%'
		}
	});
};