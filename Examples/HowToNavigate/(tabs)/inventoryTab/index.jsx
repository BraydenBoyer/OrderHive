import {Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";


export default function InventoryPage(){
    return(

        <BackDrop style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>This is the Inventory page</Text>
            <Button title={'TestingPage'} onPress={ () => router.navigate('inventoryTab/stackPage') } />
        </BackDrop>
    )
}