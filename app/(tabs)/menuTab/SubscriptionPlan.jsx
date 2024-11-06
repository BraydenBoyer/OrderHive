
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Platform } from "react-native";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import React, { useState } from "react";
import { TextInput, TouchableRipple, useTheme, IconButton, MD3Colors } from "react-native-paper";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";

const { width: screenWidth } = Dimensions.get("window");

export default function MenuPage() {
    const [textON, setTextON] = React.useState("");
    const [textPM, setTextPM] = React.useState("");

    const [isEditableON, setIsEditableON] = useState(false);
    const [isEditablePN, setIsEditablePN] = useState(false);

    const handleEditToggleON = () => {
        setIsEditableON(!isEditableON);
    };

    const handleEditTogglePn = () => {
        setIsEditablePN(!isEditablePN);
    };

    return (
        <BackDrop title="Subscription Plan" mainHeader={false}>
            <View style={styles.container}>
                <View style={[styles.backgroundContainer, styles.topContainer]}>
                    <Text style={styles.text}>Current Plan</Text>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.text, styles.basePlanText]}>Base Plan</Text>
                        <IconButton
                            icon="pencil-outline"
                            iconColor="black"
                            size={20}
                            onPress={handleEditTogglePn}
                            containerStyle={styles.iconButtonContainer}
                        />
                    </View>
                </View>

                <View style={[styles.backgroundContainer, styles.bottomContainer]}>
                    <Text style={styles.subtext}>Payment Portal</Text>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.text, styles.paymentText]}>Discover ending in 5764</Text>
                        <IconButton
                            icon="credit-card-edit"
                            iconColor="black"
                            size={20}
                            onPress={handleEditTogglePn}
                            containerStyle={styles.iconButtonContainer}
                        />
                    </View>
                </View>
            </View>
        </BackDrop>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        letterSpacing: 0.25,
        color: lightTheme.colors.black,
    },
    subtext: {
        fontSize: 18,
        letterSpacing: 0.25,
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
        width: screenWidth * 0.9, // Adjust width based on screen width
        alignItems: "flex-start",
        justifyContent: "center",
    },
    topContainer: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
    },
    bottomContainer: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 10,
    },
    basePlanText: {
        flex: 1,
        textAlign: "left",
    },
    paymentText: {
        flex: 1,
        textAlign: "left",
    },
    iconButtonContainer: {
        backgroundColor: '#000000',
        borderRadius: 10,
        padding: Platform.OS === 'android' ? 8 : 5, // Platform-specific padding
    },
});
