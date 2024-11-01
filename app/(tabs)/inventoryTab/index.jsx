import {Tabs, useFocusEffect} from "expo-router";
import {Text, View} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";
import {MyFAB} from "../../../components/FAB.jsx";
import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../_layout.jsx";


export default function InventoryPage(){

    const {setFabVisible} = useContext(AppContext)

    useFocusEffect(
        useCallback(() => {
            // If you want to do something when screen is focused
            setFabVisible(true)

            return () => {
                // If you want to do something when screen is unfocused
            }
        }, [])
    )


    return(

        <BackDrop style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>This is the Inventory page</Text>
            <Button style={{ backgroundColor: 'green'}} onPress={ () => router.navigate('inventoryTab/stackPage') }>
                TestingPagee
            </Button>
        </BackDrop>
    )
}

