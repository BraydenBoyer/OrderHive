
import {StyleSheet, Text, View, Alert, Modal, TextInput,} from "react-native";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import React, {useCallback, useState} from "react";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import { MyButton } from "../../../components/inputs/MyButton.jsx";
import {getCurrentUserInfo} from "../../firebase/user/userFunctions.js";
import {useFocusEffect} from "expo-router";
import {getOrg} from "../../firebase/user/organizationFunctions.js";
import {globalVariable} from "../../_layout.jsx";
import {addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {fireDb} from "../../firebase/initializeFirebase.js";
import CollaboratorsList from "./CollaboratorList.jsx";

export default function CollaboratorPage() {

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				await fetchCollaborators();
			};
			fetchData();
		}, [])
	);


	const [visibleSections, setVisibleSections] = useState({
		admins: false,
		editors: false,
	});
	const [editMode, setEditMode] = useState({
		admins: false,
		editors: false,
	});
	const [currentPage, setCurrentPage] = useState({
		admins: 1,
		editors: 1,
	});

	const [modalVisible, setModalVisible] = useState(false);
	const [newItemName, setNewItemName] = useState("");
	const [targetSection, setTargetSection] = useState("");

	const itemsPerPage = 5;

	const [admins, setAdmins] = useState([]);
	const [editors, setEditors] = useState([]);
	const fetchCollaborators = async () => {
		const currOrg = "Org." + globalVariable.currentOrg;
		const collaboratorRef = collection(
			fireDb,
			`organizations/${currOrg}/collaborators`
		);
		const querySnapshot = await getDocs(collaboratorRef);

		const collaboratorData = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			name: doc.data().name,
			role: doc.data().role,
		}));

		setAdmins(collaboratorData.filter((user) => user.role === "admin"));
		setEditors(collaboratorData.filter((user) => user.role === "editor"));
	};

	const toggleSection = (section) => {
		setVisibleSections((prevState) => ({
			...prevState,
			[section]: !prevState[section],
		}));
	};

	const toggleEditMode = (section) => {
		setEditMode((prevState) => ({
			...prevState,
			[section]: !prevState[section],
		}));
	};

	const handleAddItem = (section) => {
		setTargetSection(section);
		setModalVisible(true);
	};

	const confirmAddItem = async () => {
		if (newItemName.trim() === "") {
			Alert.alert("Error", "Name cannot be empty.");
			return;
		}

		const currOrg = "Org." + globalVariable.currentOrg;
		const collaboratorRef = collection(
			fireDb,
			`organizations/${currOrg}/collaborators`
		);

		try {
			const docRef = await addDoc(collaboratorRef, {
				name: newItemName.trim(),
				role: targetSection === "admins" ? "admin" : "editor",
			});
			console.log("Document written with ID: ", docRef.id);
			fetchCollaborators();
		} catch (e) {
			console.error("Error adding document: ", e);
		}

		setNewItemName("");
		setTargetSection("");
		setModalVisible(false);
	};

	const handleRemoveItem = async (section, id) => {
		const currOrg = "Org." + globalVariable.currentOrg;
		const collaboratorRef = doc(
			fireDb,
			`organizations/${currOrg}/collaborators`,
			id
		);

		try {
			await deleteDoc(collaboratorRef);
			await fetchCollaborators();
		} catch (e) {
			console.error("Error removing document: ", e);
		}
	};

	const handleChangeRole = async (section, id) => {
		const currOrg = "Org." + globalVariable.currentOrg;
		const collaboratorRef = doc(
			fireDb,
			`organizations/${currOrg}/collaborators`,
			id
		);

		try {
			await updateDoc(collaboratorRef, {
				role: section === "admins" ? "editor" : "admin",
			});
			await fetchCollaborators();
		} catch (e) {
			console.error("Error updating document: ", e);
		}
	};

	const handleNextPage = (section) => {
		setCurrentPage((prev) => ({
			...prev,
			[section]: prev[section] + 1,
		}));
	};

	const handlePrevPage = (section) => {
		setCurrentPage((prev) => ({
			...prev,
			[section]: prev[section] > 1 ? prev[section] - 1 : 1,
		}));
	};

	const renderSection = (section, data) => {
		const startIndex = (currentPage[section] - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const paginatedData = data.slice(startIndex, endIndex);

		return (
			<View style={styles.sectionContainer}>
				<Text style={styles.text}>
					{section.charAt(0).toUpperCase() + section.slice(1)}
				</Text>
				<View style={styles.inputContainer}>
					<Text style={styles.subText}>Count: {data.length} |</Text>
					<MyButton
						title={visibleSections[section] ? "Hide" : "View All"}
						onClick={() => toggleSection(section)}
					/>
					<MyButton
						title={editMode[section] ? "Done" : "Edit"}
						onClick={() => toggleEditMode(section)}
						style={{ marginLeft: 10 }}
					/>
				</View>
				{visibleSections[section] && (
					<>
						<CollaboratorsList
							data={paginatedData}
							onRemove={(id) => handleRemoveItem(section, id)}
							onChangeRole={(id) => handleChangeRole(section, id)}
							useFlatList={false}
						/>
						{editMode[section] && (
							<MyButton
								title="Add Person"
								onClick={() => handleAddItem(section)}
							/>
						)}
						<View style={styles.paginationContainer}>
							<MyButton
								title="Previous"
								onClick={() => handlePrevPage(section)}
								disabled={currentPage[section] === 1}
							/>
							<Text style={styles.pageIndicator}>
								Page {currentPage[section]} of{" "}
								{Math.ceil(data.length / itemsPerPage)}
							</Text>
							<MyButton
								title="Next"
								onClick={() => handleNextPage(section)}
								disabled={endIndex >= data.length}
							/>
						</View>
					</>
				)}
			</View>
		);
	};

	return (
		<BackDrop title="Collaborators" mainHeader={false}>
			<View style={styles.container}>
				{renderSection("admins", admins)}
				{renderSection("editors", editors)}

				<Modal visible={modalVisible} transparent animationType="slide">
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalText}>Enter
								a name:</Text>
							<TextInput
								style={styles.input}
								placeholder="Name"
								value={newItemName}
								onChangeText={setNewItemName}
							/>
							<View style={styles.modalButtons}>
								<MyButton title="Add" onClick={confirmAddItem} />
								<MyButton
									title="Cancel"
									onClick={() => setModalVisible(false)}
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</BackDrop>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
	},
	sectionContainer: {
		backgroundColor: lightTheme.colors.primaryContainer,
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
	},
	text: {
		fontSize: 25,
		fontWeight: "bold",
		color: lightTheme.colors.black,
	},
	subText: {
		fontSize: 18,
		color: lightTheme.colors.black,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 10,
	},
	listItem: {
		fontSize: 16,
		padding: 5,
		color: lightTheme.colors.black,
		backgroundColor: lightTheme.colors.secondaryContainer,
		marginVertical: 2,
		borderRadius: 5,
	},
	paginationContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: 10,
	},
	pageIndicator: {
		fontSize: 16,
		color: lightTheme.colors.black,
		textAlign: "center",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent:
		{
			width: "80%",
			padding: 20,
			backgroundColor:
			lightTheme.colors.white,
			borderRadius: 10,
			alignItems: "center",
		},
	modalText: {
		fontSize: 18,
		marginBottom: 10,
		color: lightTheme.colors.black,
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: lightTheme.colors.primary,
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
		fontSize: 16,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
});
