import {Divider, MD3LightTheme, useTheme} from "react-native-paper";
import {MyButton} from "./MyButton.jsx";
import {globalVariable} from "../../app/_layout.jsx";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";
import {buttonStyle} from "../../app/styles/components/inputs/buttons.jsx";


/*
	Versatile button that can act as a standalone or preferably in a group. See selectOrgPage.jsx for an example.

	It will generate a group of buttons that appear to be in a group when properly used.

	@author Miles
 */
export const SelectionButtons = ({orgName, index = 0, count = 1, onClick, theme}) => {
	const topRadius = index === 0 ? roundness.largeRadius : 0;
	const bottomRadius = index === count - 1 ? roundness.largeRadius : 0;

	return (
		<>
			{
				index > 0 ?
					<Divider />
					:
					<></>
			}
			<MyButton
				key={orgName} // Adding key to each button
				title={orgName}
				style={{
					height: 75,
					width: "100%",
					borderTopRightRadius: topRadius,
					borderTopLeftRadius: topRadius,
					borderBottomRightRadius: bottomRadius,
					borderBottomLeftRadius: bottomRadius,
				}}
				onClick={onClick}
				variant={'titleLarge'}
			/>
		</>

	);
};