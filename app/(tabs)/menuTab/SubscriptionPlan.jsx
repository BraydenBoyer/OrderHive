import {Link, Tabs} from "expo-router";
import {Button, StyleSheet, Text, TouchableOpacity, View,Image} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";
import React,{useState} from "react";
import {TextInput, TouchableRipple, useTheme,IconButton, MD3Colors} from "react-native-paper";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";



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
        <BackDrop title='Subscription Plan' mainHeader={false}>

            <View style={styles.container}>

                <View style={[styles.backgroundContainer,
                    {borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                    <Text style={styles.text}>Organization Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width:'80%',height: 30}}
                            mode="outlined"
                            value={textON}
                            onChangeText={textON => setTextON(textON)}
                            editable={isEditableON}

                        />
                        <Button title={isEditableON ? "Save" : "Edit"} onPress={handleEditToggleON} />
                    </View>
                </View>

                <View style={[styles.backgroundContainer, {borderTopLeftRadius: 0,borderTopRightRadius: 0}]}>
                    <Text style={styles.text}>Payment Portal</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width:'80%',height: 30}}
                            mode="outlined"
                            value={textPM}
                            onChangeText={textPM => setTextPM(textPM)}
                            editable={isEditablePN}

                        />

                        <TouchableRipple onPress={handleEditTogglePn} style={styles.button}>

                            <IconButton
                                icon="credit-card-edit"
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() => console.log('Pressed')}
                            />
                        </TouchableRipple>

                    </View>
                </View>

            </View>


        </BackDrop>
    )
}


const styles = StyleSheet.create({

    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: lightTheme.colors.black,
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

    backgroundContainer: {
        flexDirection: 'column',
        backgroundColor: lightTheme.colors.primaryContainer,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        height: 100, // Set desired container height
        width:388,
        alignItems:"left",


    },
    inputContainer: {
        flexDirection: 'row',

        height: 100, // Set desired container height
        width:388,
        alignItems:"center",
        paddingTop: 10,
        paddingBottom: 40,

    },
    textInput: {
        maxWidth:'85%',
        height: 10,
        flex: 1, // Take up available space

        paddingHorizontal: 50,
        paddingRight: 20,
    },

    button: {
        alignItems:'center',
        justifyContent:'center',
        height: 100,
        width: '100%',
    },

    iconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Adjusts the image size to contain within the button
    },
});