
import {Button, StyleSheet, Text, View} from "react-native";
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import React,{} from "react";
import {DataTable} from "react-native-paper";
import {lightTheme} from "../../styles/themes/colors/lightTheme.jsx";


export default function MenuPage() {


    const handleEditToggleON = () => {
        pass
    };

    const handleEditToggleAdd = () => {
        pass
    };

    const handleEditTogglePn = () => {
        pass
    };






    return (
        <BackDrop title='Collaborators' mainHeader={false}>

            <View style={styles.container}>

                <View style={[styles.backgroundContainer,
                    {borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderBottomWidth:.5,borderBottomColor:'white'}]}>
                    <Text style={styles.text}>Admims</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subText}>Current Admins |</Text>
                        <Text style={[styles.subText,{marginRight:150}]}> X</Text>
                        <Button title="View All" onPress={handleEditToggleON} />
                    </View>
                </View>


                <View style={[styles.backgroundContainer, {borderTopLeftRadius: 0,borderTopRightRadius: 0}]}>
                    <Text style={styles.text}>Editors</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subText}>Current Editors |</Text>
                        <Text style={[styles.subText,{marginRight:150}]}> X</Text>
                        <Button title="View All" onPress={handleEditTogglePn} />
                    </View>
                </View>


                <View style={[styles.backgroundContainer,{marginTop:20}]}>
                    <Text style={styles.text}>Collaborator Actions</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subText}>10/10/24 |</Text>
                        <Text style={[styles.subText,{marginRight:150}]}> 10:52AM</Text>
                        <Button title='View All' onPress={handleEditToggleAdd} />
                    </View>
                </View>
            </View>


        </BackDrop>
    )
}


const styles = StyleSheet.create({

    text: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: lightTheme.colors.black,
    },

    subText: {
        fontSize: 18,
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