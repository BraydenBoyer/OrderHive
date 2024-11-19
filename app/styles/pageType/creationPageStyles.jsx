import {useTheme} from "react-native-paper";
import {StyleSheet} from "react-native";
import {roundness} from "../themes/roundness/roundness.jsx";
import {globalVariable} from "../../_layout.jsx";

export const creationPageStyles = () => {

    const colors = globalVariable.colors

    return StyleSheet.create({

        topView: {
            alignItems: 'center',
            marginVertical: 75,
        },

        middleView: {

            paddingHorizontal: 10,
            rowGap: 15
        },

        bottomView: {
            marginTop: 40,
            paddingHorizontal: 10,
            flex: 1
        },

        button: {
            alignSelf: 'center',
            height: 50,
            width: '100%',
            flex: 0,
            backgroundColor: colors.primary,
            borderRadius: roundness.largeRadius,
        },

        clearButton: {
            alignSelf: 'center',
            height: 50,
            width: '100%',
            flex: 0,
            backgroundColor: 'transparent',
            borderRadius: roundness.largeRadius,
        },

    })
}