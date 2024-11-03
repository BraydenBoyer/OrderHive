import { Button, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Modal } from "react-native";
import { BackDrop } from "../../../components/Backdrop.jsx";
import React, { useState } from "react";
import { Switch } from "react-native-paper";
import ColorPicker from 'react-native-wheel-color-picker';
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";

export default function MenuPage() {

    const [isDarkSwitchOn, setIsDarkSwitchOn] = useState(false);
    const [isLightSwitchOn, setIsLightSwitchOn] = useState(true);
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF'); // Default color for primary button
    const [secondaryColor, setSecondaryColor] = useState('#FFFFFF'); // Default color for secondary button
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
    const [currentColor, setCurrentColor] = useState(primaryColor);
    const [targetButton, setTargetButton] = useState('primary');

    const toggleDarkSwitch = () => {
        setIsDarkSwitchOn(true);
        setIsLightSwitchOn(false);
    };

    const toggleLightSwitch = () => {
        setIsLightSwitchOn(true);
        setIsDarkSwitchOn(false);
    };

    const onColorChange = color => {
        setCurrentColor(color);
    };

    const handleColorSelect = () => {

        if (targetButton === 'primary') {
            setPrimaryColor(currentColor);
        } else {
            setSecondaryColor(currentColor);
        }
        setIsColorPickerVisible(false);
    };

    const openColorPicker = (buttonType) => {
        setTargetButton(buttonType);
        setCurrentColor(buttonType === 'primary' ? primaryColor : secondaryColor);
        setIsColorPickerVisible(true);
    };

    return (
        <BackDrop mainHeader={false} title='Appearance'>


            <View style={styles.container}>
                <View style={styles.backgroundContainerTop}>
                    <Text style={[styles.text, { marginRight: 180 }]}>Dark Mode</Text>
                    <Switch value={isDarkSwitchOn} onValueChange={toggleDarkSwitch} />
                </View>

                <View style={styles.backgroundContainerBottom}>
                    <Text style={[styles.text, { marginRight: 180 }]}>Light Mode</Text>
                    <Switch value={isLightSwitchOn} onValueChange={toggleLightSwitch} />
                </View>

                <View style={[styles.container, { paddingVertical: 20 }]}>
                    <View style={styles.backgroundContainerTop}>
                        <Text style={[styles.text, { marginRight: 175 }]}>Primary Color</Text>
                        <TouchableOpacity
                            style={[styles.colorButton, { backgroundColor: primaryColor }]}
                            onPress={() => openColorPicker('primary')}
                        />
                    </View>

                    <View style={styles.backgroundContainerBottom}>
                        <Text style={[styles.text, { marginRight: 150 }]}>Secondary Color</Text>
                        <TouchableOpacity
                            style={[styles.colorButton, { backgroundColor: secondaryColor }]}
                            onPress={() => openColorPicker('secondary')}
                        />
                    </View>
                </View>
            </View>


            {isColorPickerVisible && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isColorPickerVisible}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.colorPickerContainer}>
                            <ColorPicker
                                color={currentColor}
                                onColorChange={onColorChange}
                                thumbSize={20}
                                sliderSize={20}
                                noSnap={true}
                                row={false}
                            />
                            <TouchableOpacity style={styles.selectButton} onPress={handleColorSelect}>
                                <Text style={styles.selectButtonText}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </BackDrop>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color:lightTheme.colors.black,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'column',
    },
    backgroundContainerTop: {
        flexDirection: 'row',
        backgroundColor: lightTheme.colors.primaryContainer,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        height: 100,
        width: 388,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        paddingHorizontal: 30,
    },
    backgroundContainerBottom: {
        flexDirection: 'row',
        backgroundColor: lightTheme.colors.primaryContainer,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        height: 100,
        width: 388,
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 30,
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    colorPickerContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: 250,
    },
    selectButton: {
        marginTop: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    selectButtonText: {
        color: lightTheme.colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
