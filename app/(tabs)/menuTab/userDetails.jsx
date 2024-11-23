
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import React, {useState, useEffect, useCallback} from "react";
import {TextInput, useTheme} from "react-native-paper";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import { auth, db } from "../../firebase/initializeFirebase.js";
import {collection, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";

import { fireDb } from "../../firebase/initializeFirebase.js";
import {getCurrentUserInfo,updateUserPhoneNumber,updateUserUsername} from "../../firebase/user/userFunctions.js";
import {useFocusEffect} from "expo-router";
import {updateUserEmail, updateUserPassword} from "../../firebase/user/authentication.js";
import {getOrg} from "../../firebase/user/organizationFunctions.js";
import {globalVariable} from "../../_layout.jsx";


export default function MenuPage() {

    const [textUN, setTextUN] = React.useState("");
    const [textPass, setTextPass] = React.useState("");
    const [textEm, setTextEm] = React.useState("");
    const [textPM, setTextPM] = React.useState("");

    const [isEditableUN, setIsEditableUN] = useState(false);
    const [isEditablePass, setIsEditablePass] = useState(false);
    const [isEditableEm, setIsEditableEm] = useState(false);
    const [isEditablePN, setIsEditablePN] = useState(false);

    useEffect(() => {
        (
            async () =>{
                let userDetails = await getCurrentUserInfo()
                setTextUN(userDetails.name);
                setTextPass(userDetails.password);
                setTextPM(userDetails.phone);
                setTextEm(userDetails.email);
            }
        )()
    }, []);


    
    const handleEditToggleUn = () => {
        setIsEditableUN(!isEditableUN);
        if (isEditableUN) {
            (
                async () => {

                    const currOrg = "Org." + globalVariable.currentOrg;
                    const collaboratorRef = collection(
                        fireDb,
                        `organizations/${currOrg}/collaborators`
                    );
                    const querySnapshot = await getDocs(collaboratorRef);

                    const collaboratorData = querySnapshot.docs.map((doc) => ({
                        name: doc.data().name,
                        role: doc.data().role,
                    }));

                    console.log("Collaborator Data:", collaboratorData);



                    await updateUserUsername(textUN)
                }
            )()

        }
    };

    const handleEditTogglePass = () => {
        setIsEditablePass(!isEditablePass);
        if(isEditablePass){
            (

                async () =>{
                    console.log('test')
                    await updateUserPassword(textPass)
                    console.log('test')
                }

            )()
        }
    };

    const handleEditToggleEm = () => {
        setIsEditableEm(!isEditableEm);
        if(isEditableEm){
            (
                async () => {
                    console.log('test')
                    await updateUserEmail(textEm)
                    console.log('test')
                }
            )()
        }
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
                            onChangeText={setTextUN}
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
                            onChangeText={setTextPass}
                            editable={isEditablePass}
                            //secureTextEntry
                            //right={<TextInput.Icon icon="eye" />}

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
                            onChangeText={setTextEm}
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
                            onChangeText={setTextPM}
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