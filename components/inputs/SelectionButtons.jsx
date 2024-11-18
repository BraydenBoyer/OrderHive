import {Divider, MD3LightTheme, useTheme} from "react-native-paper";
import {MyButton} from "./MyButton.jsx";
import {globalVariable} from "../../app/_layout.jsx";
import {roundness} from "../../app/styles/themes/roundness/roundness.jsx";
import {buttonStyle} from "../../app/styles/components/inputs/buttons.jsx";

export const SelectionButtons = (orgName, index = 0, count = 1, onClick, theme) => {
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