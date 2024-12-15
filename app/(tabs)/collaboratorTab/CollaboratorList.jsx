import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import {globalVariable} from "../../_layout.jsx";
import {getCurrentUserInfo, getUserOrgs} from "../../firebase/user/userFunctions.js";

const CollaboratorsList = ({ data, onRemove, onChangeRole, useFlatList = true }) => {

    const colors = globalVariable.colors

    if (useFlatList) {
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 8,
                        }}
                        onPress={() =>
                            Alert.alert(
                                "Modify Person",
                                `What do you want to do with ${item.name}?`,
                                [
                                    {
                                        text: "Remove",
                                        onPress: () => onRemove(item.id),
                                    },
                                    {
                                        text: item.role === "admin"  ? "Demote" : "Promote",
                                        onPress: () => onChangeRole(item.id),
                                    },
                                    { text: "Cancel", style: "cancel" },
                                ]
                            )
                        }
                    >
                        <Text style={{ marginLeft: 8 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        );
    } else {
        return (
            <View style={{marginVertical: 10}}>
                {data.map((item) => (
                    <MyButton
                        key={item.id.toString()}
                        title={item.name}

                        onClick={() => {

                            let rank;
                            ( async () => {
                                const currentOrg = globalVariable.currentOrg
                                let allorg = await getUserOrgs()
                                rank = allorg.find(org => org.name === currentOrg).role
                                if (rank === 'admin' || rank === 'owner')
                                    Alert.alert(
                                        "Modify Person",
                                        `What do you want to do with ${item.name}?`,
                                        [
                                            {
                                                text: "Remove",
                                                onPress: () => onRemove(item.id),
                                            },
                                            {
                                                text: item.role === "admin" ? "Demote" : "Promote",
                                                onPress: () => onChangeRole(item.id),
                                            },
                                            { text: "Cancel", style: "cancel" },
                                        ]
                                    )
                                else
                                    Alert.alert(
                                        "Invalid Permissions",
                                        `This action requires admin permissions`,
                                        [
                                            { text: "Okay", style: "cancel" },
                                        ]
                                    )
                            })()
                        }}
                    >
                        <Text style={{ marginLeft: 8 }}>{item.name}</Text>
                    </MyButton>
                ))}
            </View>
        );
    }
};

export default CollaboratorsList;