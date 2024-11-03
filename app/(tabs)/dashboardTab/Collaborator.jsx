// tabs/dashboardTab/Collaborators.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";

const initialCollaborators = [
  { id: '1', name: 'Collaborator Name 1', role: 'Role 1', email: 'email1@example.com' },
  { id: '2', name: 'Collaborator Name 2', role: 'Role 2', email: 'email2@example.com' },
];

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState(initialCollaborators);
  const [editingId, setEditingId] = useState(null);
  const [editedCollaborator, setEditedCollaborator] = useState({ name: '', role: '', email: '' });

  const handleEditPress = (collaborator) => {
    setEditingId(collaborator.id);
    setEditedCollaborator({ name: collaborator.name, role: collaborator.role, email: collaborator.email });
  };

  const handleSavePress = (id) => {
    setCollaborators((prevCollaborators) =>
      prevCollaborators.map((collaborator) =>
        collaborator.id === id ? { ...collaborator, ...editedCollaborator } : collaborator
      )
    );
    setEditingId(null);
    setEditedCollaborator({ name: '', role: '', email: '' });
  };

  return (
    <BackDrop title="Collaborators" mainHeader={false}>

      {/* Collaborator List */}
      {collaborators.map((collaborator) => (
        <Card key={collaborator.id} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.leftSection}>
              {editingId === collaborator.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={editedCollaborator.name}
                    onChangeText={(text) => setEditedCollaborator({ ...editedCollaborator, name: text })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Role"
                    value={editedCollaborator.role}
                    onChangeText={(text) => setEditedCollaborator({ ...editedCollaborator, role: text })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={editedCollaborator.email}
                    onChangeText={(text) => setEditedCollaborator({ ...editedCollaborator, email: text })}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.collaboratorName}>{collaborator.name}</Text>
                  <Text style={styles.collaboratorDetails}>{collaborator.role} | {collaborator.email}</Text>
                </>
              )}
            </View>
            {editingId === collaborator.id ? (
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSavePress(collaborator.id)}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(collaborator)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      ))}
    </BackDrop>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f3e8ff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  leftSection: {
    flexDirection: 'column',
    flex: 1,
  },
  collaboratorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  collaboratorDetails: {
    fontSize: 14,
    color: '#6e6e6e',
  },
  editButton: {
    backgroundColor: '#a685e2',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#eaeaea',
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default Collaborators;
