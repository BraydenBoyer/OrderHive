import {StyleSheet, Text,View} from "react-native";
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import React, {useEffect, useState,useCallback} from "react";
import {TextInput, useTheme} from "react-native-paper";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import {globalVariable} from "../../_layout.jsx";
import {
    getOrg, updateCompanyAddress,
    updateCompanyEmail,
    updateCompanyName,
    updateCompanyPhone
} from "../../firebase/user/organizationFunctions.js";
import {useFocusEffect} from "expo-router";
import {auth, db, fireDb} from "../../firebase/initializeFirebase.js";
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {getCurrentUserInfo, updateUserUsername} from "../../firebase/user/userFunctions.js";
import {editablePageStyle} from "../../styles/pageType/editablePageStyle.jsx";
import {MyTextInput} from "../../../components/inputs/MyTextInput.jsx";


export default function MenuPage() {

    const styles = editablePageStyle

    const [textON, setTextON] = React.useState("");
    const [textAdd, setTextAdd] = React.useState("");
    const [textEm, setTextEm] = React.useState("");
    const [textPN, setTextPN] = React.useState("");


    const [isEditableON, setIsEditableON] = useState(false);
    const [isEditableAdd, setIsEditableAdd] = useState(false);
    const [isEditableEm, setIsEditableEm] = useState(false);
    const [isEditablePN, setIsEditablePN] = useState(false);

    useFocusEffect(
        useCallback( ()=>{
            (async () =>{
                const orgInfo = await getOrg(globalVariable.currentOrg);
                setTextON(orgInfo.name);
                setTextAdd(orgInfo.location);
                setTextEm(orgInfo.email);
                setTextPN(orgInfo.phone);

            })()
            //return () =>{}
        },[])
    )

        //when screen comes into focus, getOrg gets called
        //if put a return statement, gets called when leave scereen


    const handleEditToggleON = () => {
        setIsEditableON(!isEditableON);
        if (isEditableON) {
            (
                async () => {
                    await updateCompanyName(textON)
                }
            )()
        }

    };

    const handleEditToggleAdd = () => {
        setIsEditableAdd(!isEditableAdd);
        if (isEditableAdd) {
            (
                async () => {
                    await updateCompanyAddress(textAdd)

                }
            )()
        }
    };

    const handleEditToggleEm = () => {
        setIsEditableEm(!isEditableEm);
        if (isEditableEm) {
            (
                async () => {
                    await updateCompanyEmail(textEm)
                }
            )()
        }
    };

    const handleEditTogglePn = () => {
        setIsEditablePN(!isEditablePN);
        if (isEditablePN) {
            (
                async () => {
                    await updateCompanyPhone(textPN)
                }
            )()
        }

    };
    return (
        <BackDrop title='Company Details' mainHeader={false}>

            <View style={styles.container}>

                <View style={[styles.backgroundContainer]}>
                    <View style={styles.inputContainer}>

                        <MyTextInput
                            value={textON}
                            onChangeText={setTextON}
                            editable={isEditableON}
                            placeholder={'Organization Name'}
                            style={styles.textInput}
                        />
                        <MyButton
                            title={isEditableON ? "Save" : "Edit"}
                            onClick={handleEditToggleON}
                            style={styles.button}
                        />

                    </View>
                </View>

                <View style={[styles.backgroundContainer]}>
                    <View style={styles.inputContainer}>

                        <MyTextInput
                            value={textAdd}
                            onChangeText={setTextAdd}
                            editable={isEditableAdd}
                            placeholder={'Address'}
                            style={styles.textInput}
                        />
                        <MyButton
                            title={isEditableAdd ? "Save" : "Edit"}
                            onClick={handleEditToggleAdd}
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
                            title={isEditableEm ? "Save" : "Edit"}
                            onClick={handleEditToggleEm}
                            style={styles.button}
                        />

                    </View>
                </View>

                <View style={[styles.backgroundContainer]}>
                    <View style={styles.inputContainer}>

                        <MyTextInput
                            value={textPN}
                            onChangeText={setTextPN}
                            editable={isEditablePN}
                            placeholder={'Phone Number'}
                            style={styles.textInput}
                        />
                        <MyButton
                            title={isEditablePN ? "Save" : "Edit"}
                            onClick={handleEditTogglePn}
                            style={styles.button}
                        />

                    </View>
                </View>

            </View>


        </BackDrop>
    )
}