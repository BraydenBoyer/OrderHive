import {useCallback, useContext, useState} from "react";
import {Text} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import {AppContext} from "../../app/(tabs)/_layout.jsx";
import {BackDrop} from "../../components/overlays/Backdrop.jsx";
import {lightTheme} from "../../app/styles/themes/colors/lightTheme.jsx";
import {LocalFAB} from "../../components/overlays/LocalFAB.jsx";



const exampleActions = [
    {
        icon: 'cloud',
        label: 'Plus Sign',
        onPress: () => { router.navigate('/userDetails')},
        size: 'large',
        color: lightTheme.colors.secondary,
        style: {backgroundColor: lightTheme.colors.secondaryContainer}
    },
    {
        icon: 'bee',
        label: '',
        onPress: () => { return console.log('Clicked FAB cloud')},
        size: 'large',

    },
    {
        icon: 'account',
        label: 'menu sign',
        onPress: () => { return console.log('Clicked FAB Menu')},
        size: 'large'
    },
]


/*
    This is an example of how to properly set the local fab.
 */
export default function MenuPage() {

    const [visible, setVisible] = useState(false)

    useFocusEffect(
        useCallback(() => {

            setVisible(true)

            return () => {
                setVisible(false)
            }
        }, [setVisible])
    )


    return(
        <BackDrop title={'PageTitle'} mainHeader={true} >
            <Text>
                This is how you should set the fab.
            </Text>
            <LocalFAB visible={visible} icon={['cloud', 'bee']} actions={exampleActions} />
        </BackDrop>
    )
}