import {StyleSheet, View} from "react-native";
import {BackDrop} from "../../components/overlays/Backdrop.jsx";
import {Header} from "../../components/overlays/BackHeader.jsx";
import {router} from "expo-router";
import {Button, Icon, Portal, Snackbar, Text, TextInput, useTheme} from "react-native-paper";
import {MyTextInput} from "../../components/inputs/MyTextInput.jsx";
import {MyButton} from "../../components/inputs/MyButton.jsx";
import {roundness} from "./../styles/themes/roundness/roundness.jsx";
import {useEffect, useState} from "react";
import {createUser} from "../firebase/user/userFunctions.js";
import {creationPageStyles} from "../styles/pageType/creationPageStyles.jsx";
import {checkOrgExists, createOrganization} from "../firebase/user/organizationFunctions.js";
import {globalVariable, setCurrentOrg} from "../_layout.jsx";


export default function CreateOrgPage() {

    const styles = creationPageStyles()

    const [orgName, setOrgName] = useState('')
    const [orgLocation, setOrgLocation] = useState('')
    const [snackText, setSnackText] = useState('')
    const [snackVisible, setSnackVisible] = useState(false)


    const handleCreateOrg = async (name, location) => {

        name = name.trim()
        location = location.trim()

        if( name.length < 1 || location.length < 1 ){
            setSnackText('Please fill in all of the fields')
            setSnackVisible(true)
        }
        else{
            const orgExists = await checkOrgExists(name)

            if( !orgExists ){
                // only create if no org exists
                await createOrganization(name, location)

                globalVariable.currentOrg = name
                router.navigate('/selectOrgPage')
            }
            else{
                setSnackText('This organization name is taken.')
                setSnackVisible(true)
            }
        }
    }




    return(

        <BackDrop header={false}>

            <View style={styles.topView} >

                <Text variant={'displayMedium'} style={{textAlign: 'center'}} >
                    Create Your New Organization!
                </Text>

                <Icon size={50} source={'bee'} />

                <Text variant={'bodyMedium'} style={{alignSelf: 'center'}}>
                    Congrats!
                </Text>
            </View>


            <View style={styles.middleView}>
                <MyTextInput placeholder={'Organization Name'} value={orgName} onChangeText={setOrgName} />
                <MyTextInput placeholder={'Location'} value={orgLocation} onChangeText={setOrgLocation} />


                <MyButton
                    title={'Create Organization'}
                    style={styles.button}
                    onClick={() => handleCreateOrg(orgName, orgLocation, ) }
                    variant={'titleMedium'}
                    elevation={2}
                />
                <MyButton
                    title={'Cancel'}
                    style={styles.button}
                    onClick={() => {router.back()} }
                    variant={'titleMedium'}
                    elevation={2}
                />
            </View>

            <View style={styles.bottomView}>
                <MyButton
                    title={'$$$'}
                    style={styles.clearButton}
                    onClick={() => {}}
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