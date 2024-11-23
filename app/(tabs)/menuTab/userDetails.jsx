
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import React, {useState, useEffect, useCallback} from "react";
import {Snackbar, TextInput, useTheme} from "react-native-paper";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import { auth, db } from "../../firebase/initializeFirebase.js";
import {collection, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";

import { fireDb } from "../../firebase/initializeFirebase.js";
import {getCurrentUserInfo,updateUserPhone,updateUserUsername} from "../../firebase/user/userFunctions.js";
import {useFocusEffect} from "expo-router";
import {updateUserEmail, updateUserPassword, verifyUserEmail} from "../../firebase/user/authentication.js";
import {getOrg} from "../../firebase/user/organizationFunctions.js";
import {globalVariable} from "../../_layout.jsx";
import {MyTextInput} from "../../../components/inputs/MyTextInput.jsx";
import {roundness} from "../../styles/themes/roundness/roundness.jsx";
import {editablePageStyle} from "../../styles/pageType/editablePageStyle.jsx";


export default function MenuPage() {

    const styles = editablePageStyle

    const [textUN, setTextUN] = React.useState("");
    const [textPass, setTextPass] = React.useState("");
    const [textEm, setTextEm] = React.useState("");
    const [textPn, setTextPn] = React.useState("");

    const [isEditableUN, setIsEditableUN] = useState(false);
    const [isEditablePass, setIsEditablePass] = useState(false);
    const [isEditableEm, setIsEditableEm] = useState(false);
    const [isEditablePn, setIsEditablePn] = useState(false);

    const [isSnack, setSnack] = useState(false)
    const [snackText, setSnackText] = useState('')

    useEffect(() => {
        (
            async () =>{
                let userDetails = await getCurrentUserInfo()
                setTextUN(userDetails.name);
                setTextPass(userDetails.password);
                setTextPn(userDetails.phone);
                setTextEm(userDetails.email);
            }
        )()
    }, []);


    const handleEmailVerification = () => {

        console.log('Starting email verification')
        verifyUserEmail()

        setSnackText('Email verification sent. Please check your email.')
        setSnack(true)
    }
    
    const handleEditToggleUn = () => {
        setIsEditableUN(!isEditableUN);
        if (isEditableUN) {
            (
                async () => {
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
                    console.log('EnteredEmailFunction')
                    let res = await updateUserEmail(textEm)

                    if( res === '0' ){ // means that there were no errors
                        setSnack(false)
                    }
                    else if( res === 'auth/operation-not-allowed'){
                        setSnackText('Please verify your email before changing email.')
                        setSnack(true)
                    }

                    console.log(`updateUserEmail response: ${res}`)
                }
            )()
        }
    };

    const handleEditTogglePn = () => {
        setIsEditablePn(!isEditablePn);
        if(isEditablePn){
            (
                async ()=>{
                    await updateUserPhone(textPn)
                })()
        }
    };
    return (
        <View style={{flex: 1}}>
            <BackDrop title='User Details' mainHeader={false}>

                <View style={styles.container}>

                    <View style={[styles.backgroundContainer]}>
                        <View style={styles.inputContainer}>

                            <MyTextInput
                                value={textUN}
                                onChangeText={setTextUN}
                                placeholder={'Username'}
                                editable={isEditableUN}
                                style={styles.textInput}
                            />
                            <MyButton
                                title={isEditableUN ? "Save" : "Edit"}
                                onClick={handleEditToggleUn}
                                style={styles.button}
                            />

                        </View>
                    </View>

                    <View style={[styles.backgroundContainer]}>
                        <View style={styles.inputContainer}>

                            <MyTextInput
                                value={textPass}
                                onChangeText={setTextPass}
                                editable={isEditablePass}
                                placeholder={'Password'}
                                style={styles.textInput}
                            />
                            <MyButton
                                title={isEditablePass ? "Save" : "Edit"}
                                onClick={handleEditTogglePass}
                                style={styles.button}
                            />

                        </View>
                    </View>

                    <View style={[styles.backgroundContainer]}>
                        <View style={styles.inputContainer}>

                            <MyTextInput
                                value={textEm}
                                onChangeText={setTextEm}
                                editable={isEditableEm}
                                placeholder={'Email'}
                                style={styles.textInput}
                            />
                            <MyButton
                                title={isEditablePass ? "Save" : "Edit"}
                                onClick={handleEditToggleEm}
                                style={styles.button}
                            />

                        </View>
                    </View>

                    <View style={[styles.backgroundContainer]}>
                        <View style={styles.inputContainer}>

                            <MyTextInput
                                value={textPn}
                                onChangeText={setTextPn}
                                editable={isEditablePn}
                                placeholder={'Phone Number'}
                                style={styles.textInput}
                            />
                            <MyButton
                                title={isEditablePass ? "Save" : "Edit"}
                                onClick={handleEditTogglePn}
                                style={styles.button}
                            />

                        </View>
                    </View>

                    <MyButton
                        title={'Verify Email'}
                        onClick={handleEmailVerification}
                        style={[
                            styles.button
                        ]}
                        variant={'titleLarge'}
                    />

                    <MyButton
                        title={'2-Step Verification'}
                        onClick={() => handleEditToggleEm}
                        variant={'titleLarge'}
                    />

                </View>

            </BackDrop>

            <Snackbar visible={isSnack} onDismiss={() => setSnack(false)} duration={4000} >
                {snackText}
            </Snackbar>
        </View>
    )
}