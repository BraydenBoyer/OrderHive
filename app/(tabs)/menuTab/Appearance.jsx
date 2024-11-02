import {Link, Tabs} from "expo-router";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";
import React,{useState} from "react";
import {TextInput} from "react-native-paper";


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
        <BackDrop>
            <View>
                <Text style={styles.title}>Appearance</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.container}>

                    <View style={[styles.backgroundContainer,
                        {borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                        <Text style={styles.text}>Dark Mode</Text>

                    </View>

                    <View style={[styles.backgroundContainer,{borderTopLeftRadius: 0,borderTopRightRadius: 0}]}>
                        <Text style={styles.text}>Light Mode</Text>

                    </View>
                </View>


                <View style={[styles.container,{paddingVertical:20}]}>

                    <View style={[styles.backgroundContainer,
                        {borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                        <Text style={styles.text}>Primary Color</Text>


                    </View>

                    <View style={[styles.backgroundContainer,{borderTopLeftRadius: 0,borderTopRightRadius: 0}]}>
                        <Text style={styles.text}>Secondary Color</Text>

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
        color: 'white',
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
        backgroundColor: '#353562',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        height: 100, // Set desired container height
        width:388,
        alignItems:"left",
        justifyContent:"center"


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