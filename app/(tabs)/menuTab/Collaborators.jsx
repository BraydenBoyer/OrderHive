import { Button, StyleSheet, Text, View } from "react-native";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import React, { useState } from "react";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import CollaboratorsList from "./CollaboratorList.jsx";
import { MyButton } from "../../../components/inputs/MyButton.jsx";

export default function MenuPage() {
    const [visibleSections, setVisibleSections] = useState({
        admins: false,
        editors: false,
        collaborators: false
    });

    // Sample collaborators data
    const admins = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
        { id: 6, name: 'Frank' },
        { id: 7, name: 'Grace' }
    ];

    const editors = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
        { id: 6, name: 'Frank' },
        { id: 7, name: 'Grace' }
    ];

    const collaborators = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
        { id: 6, name: 'Frank' },
        { id: 7, name: 'Grace' }
    ];

    const toggleSection = (section) => {
        setVisibleSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <BackDrop title="Collaborators" mainHeader={false}>
            <View style={styles.container}>

                <View style={[styles.backgroundContainer, { borderBottomWidth: 0.5, borderBottomColor: 'white' }]}>
                    <Text style={styles.text}>Admins</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subText}>Current Admins |</Text>
                        <Text style={[styles.subText, { marginRight: 150 }]}>
                            {admins.length} {/* Display the number of admins */}
                        </Text>
                        <MyButton title="View All" onClick={() => toggleSection('admins')} />
                    </View>
                    {visibleSections.admins && (
                        <View style={styles.listContainer}>
                            <CollaboratorsList collaborators={admins} />
                        </View>
                    )}
                </View>

                <View style={[styles.backgroundContainer, { borderTopWidth: 0.5, borderTopColor: 'white' }]}>
                    <Text style={styles.text}>Editors</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subText}>Current Editors |</Text>
                        <Text style={[styles.subText, { marginRight: 150 }]}>
                            {editors.length} {/* Display the number of editors */}
                        </Text>
                        <MyButton title="View All" onClick={() => toggleSection('editors')} />
                    </View>
                    {visibleSections.editors && (
                        <View style={styles.listContainer}>
                            <CollaboratorsList collaborators={editors} />
                        </View>
                    )}
                </View>

                <View style={[styles.backgroundContainer, { marginTop: 20 }]}>
                    <Text style={styles.text}>Collaborator Actions</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subText}>10/10/24 |</Text>
                        <Text style={[styles.subText, { marginRight: 150 }]}>10:52AM</Text>
                        <MyButton title="View All" onClick={() => toggleSection('collaborators')} />
                    </View>
                    {visibleSections.collaborators && (
                        <View style={styles.listContainer}>
                            <CollaboratorsList collaborators={collaborators} />
                        </View>
                    )}
                </View>
            </View>
        </BackDrop>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: lightTheme.colors.black,
    },
    subText: {
        fontSize: 18,
        color: lightTheme.colors.black,
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'column',
    },
    backgroundContainer: {
        flexDirection: 'column',
        backgroundColor: lightTheme.colors.primaryContainer,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        width: 388,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
    },
    listContainer: {
        paddingVertical: 10,
    }
});
