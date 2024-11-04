import {useCallback, useContext} from "react";
import {Text} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import {AppContext} from "../../app/(tabs)/_layout.jsx";
import {BackDrop} from "../../components/overlays/Backdrop.jsx";
import {lightTheme} from "../../app/styles/themes/colors/lightTheme.jsx";



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

export default function MenuPage() {

    const {setFabVisible, setIcon, setActions} = useContext(AppContext)

    useFocusEffect(
        useCallback(() => {
            // If you want to do something when screen is focused
            setFabVisible(true)
            setActions(exampleActions)
            setIcon(['bee', 'minus'])

            return () => {
                // If you want to do something when screen is unfocused

            }
        }, [])
    )


    return(
        <BackDrop title={'PageTitle'} mainHeader={true} >
            <Text>
                This is how you should set the fab.
            </Text>
        </BackDrop>
    )
}