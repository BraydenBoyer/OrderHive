import {Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {Router} from 'expo-router'


export default function Layout(){
    return(

        <View>
            <Text >This is the Inventory page</Text>
            <Button title={'Home'} onPress={ () => Router.navigate('./app') } />
        </View>
    )
}