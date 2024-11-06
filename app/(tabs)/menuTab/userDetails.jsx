import {Link, Tabs} from "expo-router";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import React,{useState} from "react";
import {TextInput, useTheme} from "react-native-paper";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";

export default function MenuPage() {
    const [textUN, setTextUN] = React.useState("");
    const [textPass, setTextPass] = React.useState("");
    const [textEm, setTextEm] = React.useState("");
    const [textPM, setTextPM] = React.useState("");

    const [isEditableUN, setIsEditableUN] = useState(false);
    const [isEditablePass, setIsEditablePass] = useState(false);
    const [isEditableEm, setIsEditableEm] = useState(false);
    const [isEditablePN, setIsEditablePN] = useState(false);

    const handleEditToggleUn = () => {
        setIsEditableUN(!isEditableUN);
    };

    const handleEditTogglePass = () => {
        setIsEditablePass(!isEditablePass);
    };

    const handleEditToggleEm = () => {
        setIsEditableEm(!isEditableEm);
    };

    const handleEditTogglePn = () => {
        setIsEditablePN(!isEditablePN);
    };
    return (
        <BackDrop title='User Details' mainHeader={false}>

            <View style={styles.container}>

                <View style={[styles.backgroundContainer,
                    {borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                    <Text style={styles.text}>UserName</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width:'80%',height: 30}}
                            mode="outlined"
                            value={textUN}
                            onChangeText={textUN => setTextUN(textUN)}
                            editable={isEditableUN}

                        />
                        <MyButton  title={isEditableUN ? "Save" : "Edit"} onClick={handleEditToggleUn}/>

                    </View>
                </View>

                <View style={[styles.backgroundContainer,
                    {borderRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width:'80%',height: 30}}
                            mode="outlined"
                            value={textPass}
                            onChangeText={textPass => setTextPass(textPass)}
                            editable={isEditablePass}
                            secureTextEntry
                            right={<TextInput.Icon icon="eye" />}

                        />
                        <MyButton title={isEditablePass ? "Save" : "Edit"} onClick={handleEditTogglePass}/>

                    </View>
                </View>

                <View style={[styles.backgroundContainer,
                    {borderRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width:'80%',height: 30}}
                            mode="outlined"
                            value={textEm}
                            onChangeText={textEm => setTextEm(textEm)}
                            editable={isEditableEm}

                        />
                        <MyButton title={isEditableEm ? "Save" : "Edit"} onClick={handleEditToggleEm} />
                    </View>
                </View>

                <View style={[styles.backgroundContainer, {borderTopLeftRadius: 0,borderTopRightRadius: 0}]}>
                    <Text style={styles.text}>Phone</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width:'80%',height: 30}}
                            mode="outlined"
                            value={textPM}
                            onChangeText={textPM => setTextPM(textPM)}
                            editable={isEditablePN}

                        />
                        <MyButton title={isEditablePN ? "Save" : "Edit"} onClick={handleEditTogglePn} />
                    </View>
                </View>




                <View style={[styles.backgroundContainer,{marginVertical: 20,alignItems: "center",justifyContent:"center",paddingHorizontal:10}]}>
                    <TouchableOpacity style={styles.button} onPress={handleEditToggleEm}>
                        <Text style={styles.text}>Enable 2-Step Verification</Text>
                    </TouchableOpacity>
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
    }
});