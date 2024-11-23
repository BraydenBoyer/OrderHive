import { Button, StyleSheet, SafeAreaView, View, TouchableOpacity, Modal } from "react-native";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import React, { useState } from "react";
import {Divider, Switch} from "react-native-paper";
import ColorPicker from 'react-native-wheel-color-picker';
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MySurface} from "../../../components/MySurface.jsx";
import {roundness} from "../../styles/themes/roundness/roundness.jsx";
import {Text} from 'react-native-paper'
import {globalVariable} from "../../_layout.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";

export default function MenuPage() {

    const [isDarkSwitchOn, setIsDarkSwitchOn] = useState(false);
    const [isLightSwitchOn, setIsLightSwitchOn] = useState(true);
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF'); // Default color for primary button
    const [secondaryColor, setSecondaryColor] = useState('#FFFFFF'); // Default color for secondary button
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
    const [currentColor, setCurrentColor] = useState(primaryColor);
    const [targetButton, setTargetButton] = useState('primary');

    const colors = globalVariable.colors

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

                <MySurface style={styles.backgroundContainer}>
                    <Text variant={'headlineMedium'} >
                        Dark Mode
                    </Text>
                    <Switch value={isDarkSwitchOn} onValueChange={toggleDarkSwitch} />
                </MySurface>

                <MySurface style={styles.backgroundContainer}>
                    <Text variant={'headlineMedium'} >
                        Light Mode
                    </Text>
                    <Switch value={isLightSwitchOn} onValueChange={toggleLightSwitch} />
                </MySurface>

                <MySurface style={[styles.surroundContainer]} >

                    <View style={styles.insideContainer}>
                        <Text variant={'headlineMedium'} >
                            Primary Color
                        </Text>
                        <MyButton
                            title={''}
                            onClick={() => openColorPicker('primary')}
                            style={{backgroundColor: primaryColor}}
                        />
                    </View>
                    <Divider bold={true} />
                    <View style={styles.insideContainer}>
                        <Text variant={'headlineMedium'} >
                            Secondary Color
                        </Text>
                        <MyButton
                            title={''}
                            onClick={() => openColorPicker('secondary')}
                            style={{ backgroundColor: secondaryColor }}
                        />
                    </View>

                </MySurface>

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
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    container: {
        flexDirection: 'column',
        rowGap: 20,
    },
    backgroundContainer: {
        flexDirection: 'row',
        borderRadius: roundness.mediumRadius,
        height: 100,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    surroundContainer: {
        flexDirection: 'column',
        borderRadius: roundness.mediumRadius,
        padding: 20,
        rowGap: 20
    },
    insideContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
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
