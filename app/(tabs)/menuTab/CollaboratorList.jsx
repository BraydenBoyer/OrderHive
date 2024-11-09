import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Checkbox } from 'react-native-paper';
import {MyButton} from "../../../components/inputs/MyButton.jsx";

const CollaboratorsList = ({ collaborators = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCollaborators, setSelectedCollaborators] = useState({});
    const itemsPerPage = 5;

    // Get the data for the current page
    const paginatedCollaborators = collaborators.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Toggle the checkbox for a collaborator
    const toggleCheckbox = (id) => {
        setSelectedCollaborators((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <View>
            {/* Displays the Contents of each list*/}
            <FlatList
                data={paginatedCollaborators}
                //Here to check for unique keys
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (//executes for each item in the list
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <Checkbox
                            status={selectedCollaborators[item.id] ? 'checked' : 'unchecked'}
                            onPress={() => toggleCheckbox(item.id)}
                        />
                        <Text style={{ marginLeft: 8 }}>{item.name}</Text>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                <MyButton
                    title="Previous"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                />
                <Text>Page {currentPage}</Text>
                <MyButton
                    title="Next"
                    onClick={() =>
                        setCurrentPage((prev) =>
                            prev < Math.ceil(collaborators.length / itemsPerPage) ? prev + 1 : prev
                        )
                    }
                    disabled={currentPage === Math.ceil(collaborators.length / itemsPerPage)}
                />
            </View>
        </View>
    );
};

export default CollaboratorsList;

