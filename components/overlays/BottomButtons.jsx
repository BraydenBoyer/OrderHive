import { Portal } from "react-native-paper";
import { MyButton } from "../inputs/MyButton.jsx";
import {Modal, StyleSheet, View} from "react-native";
import { roundness } from "../../app/styles/themes/roundness/roundness.jsx";
import {globalVariable} from "../../app/_layout.jsx";



/*
	Creates two buttons on the bottom of the screen.

	@author Miles
 */

const colors = globalVariable.colors

export const BottomButtons = ({
		visible = true,
		firstTitle = 'FirstTitle',
		secondTitle = 'SecondTitle',
		firstOnClick = () => {},
		secondOnClick = () => {},
	}) => {


	return (!visible) ?

		<></>
		:
		<Portal>
			<View
				style={{
					flex: 1,
					justifyContent: "flex-end", // Push content to the bottom
				}}
			>
				<View
					style={styles.container}
				>
					<MyButton
						title={firstTitle}
						variant={'titleLarge'}
						onClick={firstOnClick}
						elevation={1}
						style={styles.button}
					/>

					<MyButton
						title={secondTitle}
						variant={'titleLarge'}
						onClick={secondOnClick}
						elevation={1}
						style={styles.button}
					/>

				</View>
			</View>
		</Portal>
};


const styles = StyleSheet.create({

	button: {
		flex: 1,
		height: '100%',
		width: '100%',
		backgroundColor: colors.primary
	},

	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: globalVariable.colors.primaryContainer,
		height: 160,
		padding: 10,
		columnGap: 15,
		borderTopRightRadius: roundness.largeRadius,
		borderTopLeftRadius: roundness.largeRadius,
		borderColor: colors.onPrimary,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 1
	}
})