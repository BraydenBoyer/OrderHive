import {useContext, useEffect, useState} from "react";
import { BackDrop } from "../../components/overlays/Backdrop.jsx";
import { StyleSheet, View } from "react-native";
import { creationPageStyles } from "../styles/pageType/creationPageStyles.jsx";
import {Icon, Text, useTheme} from "react-native-paper";
import {SelectionButtons} from "../../components/inputs/SelectionButtons.jsx";
import { getUserOrgs } from "../firebase/user/userFunctions.js";
import {globalVariable, ThemeContext} from "../_layout.jsx";
import { router } from "expo-router";
import {MyButton} from "../../components/inputs/MyButton.jsx";

const handleSelectionClick = (orgName) => {
	globalVariable.currentOrg = orgName;
	console.log("Selected org: ", globalVariable.currentOrg)
	router.navigate("../dashboardTab");
}

export default function SelectOrgPage() {
	const [orgNames, setOrgNames] = useState([]);
	const creationStyles = creationPageStyles();
	const {hiveTheme} = useContext(ThemeContext)
	const styles = fileStyle()

	useEffect(() => {
		(async () => {
			const orgs = await getUserOrgs();
			const newOrgNames = []; // Create a new array

			for (const orgID in orgs) {
				newOrgNames.push(orgs[orgID].name); // Push to the new array
			}

			setOrgNames(newOrgNames); // Update state with the new array
			console.log("Initializing 'choose user org' ", newOrgNames)
		})();
	}, []);

	return (
		<BackDrop header={false}>
			<View style={creationStyles.topView}>
				<Text variant={"displayMedium"} style={{ textAlign: "center" }}>
					Choose your organization
				</Text>
				<Icon size={50} source={"bee"} />
			</View>

			<View style={styles.middleView}>
				{orgNames.map((orgName, index) =>
					<SelectionButtons
						key={orgName}
						orgName={orgName}
						index={index}
						count={orgNames.length}
						onClick={() => handleSelectionClick(orgName)}
						theme={hiveTheme}
					/>
				)}
			</View>

			<View style={creationStyles.bottomView}>

				<MyButton
					title={'Join a new organization'}
					style={creationStyles.clearButton}
					onClick={() => {router.navigate('./joinOrgPage')}}
					variant={'bodyMedium'}
					elevation={0}
					iconLeft={'bee'}
					iconRight={'bee'}
				/>

			</View>
		</BackDrop>
	);
}

const fileStyle = () => {
	return StyleSheet.create({
		middleView: {
			paddingHorizontal: 10
		},
	});
}
