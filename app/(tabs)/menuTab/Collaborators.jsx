import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
} from "react-native";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import React, { useState } from "react";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import { MyButton } from "../../../components/inputs/MyButton.jsx";

export default function MenuPage() {
    const [visibleSections, setVisibleSections] = useState({
        admins: false,
        editors: false,
        collaborators: false,
    });
    const [editMode, setEditMode] = useState({
        admins: false,
        editors: false,
        collaborators: false,
    });
    const [currentPage, setCurrentPage] = useState({
        admins: 1,
        editors: 1,
        collaborators: 1,
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [targetSection, setTargetSection] = useState("");

    const itemsPerPage = 5;

    const [admins, setAdmins] = useState([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "David" },
        { id: 5, name: "Eve" },
        { id: 6, name: "Frank" },
        { id: 7, name: "Grace" },
    ]);

    const [editors, setEditors] = useState([
        { id: 8, name: "Hannah" },
        { id: 9, name: "Ian" },
        { id: 10, name: "Jack" },
        { id: 11, name: "Karen" },
        { id: 12, name: "Leo" },
        { id: 13, name: "Mia" },
        { id: 14, name: "Nathan" },
    ]);

    const [collaborators, setCollaborators] = useState([
        { id: 15, name: "Olivia" },
        { id: 16, name: "Paul" },
        { id: 17, name: "Quinn" },
        { id: 18, name: "Rachel" },
        { id: 19, name: "Sam" },
        { id: 20, name: "Tina" },
        { id: 21, name: "Uma" },
    ]);

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

    const confirmAddItem = () => {
        if (newItemName.trim() === "") {
            Alert.alert("Error", "Name cannot be empty.");
            return;
        }

        const newItem = { id: Date.now(), name: newItemName.trim() };

        if (targetSection === "admins") setAdmins((prev) => [...prev, newItem]);
        if (targetSection === "editors") setEditors((prev) => [...prev, newItem]);
        if (targetSection === "collaborators")
            setCollaborators((prev) => [...prev, newItem]);

        setNewItemName("");
        setTargetSection("");
        setModalVisible(false);
    };

    const handleRemoveItem = (section, id) => {
        if (section === "admins") setAdmins((prev) => prev.filter((item) => item.id !== id));
        if (section === "editors") setEditors((prev) => prev.filter((item) => item.id !== id));
        if (section === "collaborators")
            setCollaborators((prev) => prev.filter((item) => item.id !== id));
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
        const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.text}>{section.charAt(0).toUpperCase() + section.slice(1)}</Text>
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
                        <FlatList
                            data={paginatedData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() =>
                                        Alert.alert(
                                            "Modify Item",
                                            `What do you want to do with ${item.name}?`,
                                            [
                                                {
                                                    text: "Remove",
                                                    onPress: () => handleRemoveItem(section, item.id),
                                                },
                                                { text: "Cancel", style: "cancel" },
                                            ]
                                        )
                                    }
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            scrollEnabled={false}
                        />
                        {editMode[section] && (
                            <MyButton title="Add Item" onClick={() => handleAddItem(section)} />
                        )}
                        <View style={styles.paginationContainer}>
                            <MyButton
                                title="Previous"
                                onClick={() => handlePrevPage(section)}
                                disabled={currentPage[section] === 1}
                            />
                            <Text style={styles.pageIndicator}>
                                Page {currentPage[section]} of {Math.ceil(data.length / itemsPerPage)}
                            </Text>
                            <MyButton
                                title="Next"
                                onClick={() => handleNextPage(section)}
                                disabled={startIndex + itemsPerPage >= data.length}
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
                {renderSection("collaborators", collaborators)}

                {/* Modal for adding new item */}
                <Modal visible={modalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Enter a name:</Text>
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
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: lightTheme.colors.white,
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
