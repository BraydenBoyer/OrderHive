import {StyleSheet, View} from "react-native";
import {BackDrop} from "../../components/overlays/Backdrop.jsx";
import {Header} from "../../components/overlays/BackHeader.jsx";
import {router} from "expo-router";
import {Button, Icon, Portal, Snackbar, Text, TextInput, useTheme} from "react-native-paper";
import {MyTextInput} from "../../components/inputs/MyTextInput.jsx";
import {MyButton} from "../../components/inputs/MyButton.jsx";
import {roundness} from "./../styles/themes/roundness/roundness.jsx";
import {useEffect, useState} from "react";
import {addOrgToUser, createUser, userHasOrg} from "../firebase/user/userFunctions.js";
import {creationPageStyles} from "../styles/pageType/creationPageStyles.jsx";
import {addCurrentUserToOrg, checkOrgExists} from "../firebase/user/organizationFunctions.js";
import {globalVariable} from "../_layout.jsx";
import {setGlobalOrgs} from "../index.jsx";



export default function JoinOrgPage() {

    const styles = creationPageStyles()

    const [orgName, setOrgName] = useState('')

    const [snackText, setSnackText] = useState('')
    const [snackVisible, setSnackVisible] = useState(false)


    const handleJoinOrg = async () => {

        const orgExists = await checkOrgExists(orgName)

        console.log(orgExists)

        if( orgName.length < 1 ){
            setSnackText('Fill in all of the fields.')
            setSnackVisible(true)
        }
        else if( !orgExists ){
            setSnackText('That organization does not exist.')
            setSnackVisible(true)
        }
        else{
            await addCurrentUserToOrg(orgName, 'editor')
            await addOrgToUser(orgName, 'editor' )

            globalVariable.currentOrg = orgName
            await setGlobalOrgs()
            router.navigate('/selectOrgPage')
        }
    }



    return(

        <BackDrop header={false}>

            <View style={styles.topView} >

                <Text variant={'displayMedium'} style={{textAlign: 'center'}} >
                    First, Join Your Organization
                </Text>

                <Icon size={50} source={'bee'} />

                <Text variant={'bodyMedium'} style={{alignSelf: 'center'}}>
                    or create a new one
                </Text>
            </View>


            <View style={styles.middleView}>
                <MyTextInput placeholder={'Organization Name'} value={orgName} onChangeText={setOrgName} />

                <MyButton
                    title={'Join'}
                    style={styles.button}
                    onClick={() => {handleJoinOrg()} }
                    variant={'titleMedium'}
                    elevation={2}
                />
            </View>

            <View style={styles.bottomView}>
                <MyButton
                    title={'Create a new organization'}
                    style={styles.clearButton}
                    onClick={() => {router.navigate('/createOrgPage')}}
                    variant={'bodyMedium'}
                    elevation={0}
                    iconLeft={'bee'}
                    iconRight={'bee'}
                />
            </View>

            <Portal>
                <Snackbar duration={4000} visible={snackVisible} onDismiss={() => setSnackVisible(false)} >
                    {snackText}
                </Snackbar>
            </Portal>

        </BackDrop>

    )
}