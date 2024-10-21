import {Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {Router} from 'expo-router'


export default function Layout(){
    return(

        <View>
            <Text >This is the Home page</Text>
            <Button title={'Inventory'} onPress={ () => Router.navigate('./inventory') } />
        </View>
    )
}