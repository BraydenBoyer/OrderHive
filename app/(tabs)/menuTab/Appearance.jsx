import {Link, Tabs} from "expo-router";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";
import React,{useState} from "react";
import {Switch } from "react-native-paper";


export default function MenuPage() {

        const [isDarkSwitchOn, setIsDarkSwitchOn] = useState(false);
        const [isLightSwitchOn, setIsLightSwitchOn] = useState(true);

        const toggleDarkSwitch = () => {
            setIsDarkSwitchOn(true);
            setIsLightSwitchOn(false);
        };

        const toggleLightSwitch = () => {
            setIsLightSwitchOn(true);
            setIsDarkSwitchOn(false);
        };
    return (
        <BackDrop>
            <View>
                <Text style={styles.title}>Appearance</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.container}>

                    <View style={styles.backgroundContainerTop}>
                        <Text style={[styles.text,{marginRight:180}]}>Dark Mode</Text>
                        <Switch value={isDarkSwitchOn} onValueChange={toggleDarkSwitch} />
                    </View>

                    <View style={styles.backgroundContainerBottom}>
                        <Text style={[styles.text,{marginRight:180}]}>Light Mode</Text>
                        <Switch value={isLightSwitchOn} onValueChange={toggleLightSwitch} />

                    </View>
                </View>


                <View style={[styles.container,{paddingVertical:20}]}>

                    <View style={styles.backgroundContainerTop}>
                        <Text style={styles.text}>Primary Color</Text>


                    </View>

                    <View style={styles.backgroundContainerBottom}>
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

    backgroundContainerTop: {
        flexDirection: 'row',
        backgroundColor: '#353562',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        height: 100,
        width:388,
        alignItems:"center",
        justifyContent:"left",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth:.5,
        borderBottomColor:'white',
        paddingHorizontal:30

    },

    backgroundContainerBottom: {
        flexDirection: 'row',
        backgroundColor: '#353562',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        height: 100,
        width:388,
        alignItems:"center",
        justifyContent:"left",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0


    },


});