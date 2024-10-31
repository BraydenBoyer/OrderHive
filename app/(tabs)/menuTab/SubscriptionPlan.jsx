import {Link, Tabs} from "expo-router";
import {Button, Text, View} from "react-native";
import {router} from 'expo-router'
import {BackDrop} from "../../../components/Backdrop.jsx";


export default function MenuPage() {
    return (

        <BackDrop style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>This is the Subscription Plan page. Purely for testing navigation.</Text>
            <Button title={'Menu'} onPress={() => router.navigate('(tabs)/menuTab')}/>
            <Link href={'menuTab/index'}/>
        </BackDrop>
    )
}
