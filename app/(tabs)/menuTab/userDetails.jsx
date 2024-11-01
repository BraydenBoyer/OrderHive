import {Link, Tabs} from "expo-router";
import {Button, StyleSheet, Text, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";
import React,{useState} from "react";
import {TextInput} from "react-native-paper";


export default function MenuPage() {
    const [text, setText] = React.useState("");
    const [isEditable, setIsEditable] = useState(false);
    const handleEditToggle = () => {
        setIsEditable(!isEditable);
    };
    return (
        <BackDrop>
            <View>
                <Text style={styles.title}>User Details</Text>
            </View>
            <View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        label="Email"
                        value={text}
                        onChangeText={text => setText(text)}
                        editable={isEditable}

                    />
                    <Button title={isEditable ? "Save" : "Edit"} onPress={handleEditToggle} />
                </View>



            </View>

        </BackDrop>
    )
}


const styles = StyleSheet.create({

    text: {
        fontSize: 16,
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
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#353562'

    },
    textInput: {
        maxWidth:'85%',
        height: 45,
        flex: 1, // Take up available space
        marginRight: 10, // Add space between TextInput and Button

    },
});