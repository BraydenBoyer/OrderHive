import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";

const CollaboratorsList = ({ data, onRemove, onChangeRole, useFlatList = true }) => {
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
                                        text: item.role === "admin" ? "Demote" : "Promote",
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
            <View>
                {data.map((item) => (
                    <TouchableOpacity
                        key={item.id.toString()}
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
                                        text: item.role === "admin" ? "Demote" : "Promote",
                                        onPress: () => onChangeRole(item.id),
                                    },
                                    { text: "Cancel", style: "cancel" },
                                ]
                            )
                        }
                    >
                        <Text style={{ marginLeft: 8 }}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
};

export default CollaboratorsList;