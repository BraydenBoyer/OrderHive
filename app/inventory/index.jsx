import {Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {router} from 'expo-router'


export default function Layout(){
    return(

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text >This is the Inventory page</Text>
            <Button title={'Home'} onPress={ () => router.navigate('') } />
        </View>
    )
}