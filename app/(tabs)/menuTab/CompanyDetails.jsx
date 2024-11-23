import {StyleSheet, Text,View} from "react-native";
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import React, {useEffect, useState,useCallback} from "react";
import {TextInput, useTheme} from "react-native-paper";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import {globalVariable} from "../../_layout.jsx";
import {getOrg} from "../../firebase/user/organizationFunctions.js";
import {useFocusEffect} from "expo-router";
import {auth, db, fireDb} from "../../firebase/initializeFirebase.js";
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {getCurrentUserInfo} from "../../firebase/user/userFunctions.js";


export default function MenuPage() {



    const [textON, setTextON] = React.useState("");
    const [textAdd, setTextAdd] = React.useState("");
    const [textEm, setTextEm] = React.useState("");
    const [textPM, setTextPM] = React.useState("");


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
                //setTextEm(orgInfo.email);
                //setTextPM(orgInfo.phone);

            })()
            //return () =>{}
        },[])
    )

        //when screen comes into focus, getOrg gets called
        //if put a return statement, gets called when leave scereen


    const handleEditToggleON = () => {
        setIsEditableON(!isEditableON);

    };

    const handleEditToggleAdd = () => {
        setIsEditableAdd(!isEditableAdd);
    };

    const handleEditToggleEm = () => {
        setIsEditableEm(!isEditableEm);
    };

    const handleEditTogglePn = () => {
        setIsEditablePN(!isEditablePN);
    };
    return (
        <BackDrop title='Company Details' mainHeader={false}>

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
                        <MyButton title={isEditableON ? "Save" : "Edit"} onClick={handleEditToggleON} />
                    </View>
                </View>

                <View style={[styles.backgroundContainer,
                    {borderRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                    <Text style={styles.text}>Address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{width:'80%',height: 30}}
                            mode="outlined"
                            value={textAdd}
                            onChangeText={textAdd => setTextAdd(textAdd)}
                            editable={isEditableAdd}

                        />
                        <MyButton title={isEditableAdd ? "Save" : "Edit"} onClick={handleEditToggleAdd} />
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
                    <Text style={styles.text}>Phone Number</Text>
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