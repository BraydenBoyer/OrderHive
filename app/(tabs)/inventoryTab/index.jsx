import {Tabs} from "expo-router";
import {Text, View} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";


export default function InventoryPage(){
    return(

        <BackDrop style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>This is the Inventory page</Text>
            <Button style={{ backgroundColor: 'green'}} onPress={ () => router.navigate('inventoryTab/stackPage') }>
                TestingPagee
            </Button>
        </BackDrop>
    )
}

