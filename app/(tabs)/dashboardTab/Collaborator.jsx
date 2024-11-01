// tabs/dashboardTab/Collaborators.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import ActionButton from '../../../components/ActionButton'; 
import SettingsButton from '../../../components/SettingsButton';

const collaborators = [
  { id: '1', name: 'Collaborator Name', role: 'Role', email: 'Email' },
  { id: '2', name: 'Collaborator Name', role: 'Role', email: 'Email' },
];

const Collaborators = () => {
  return (
    <View style={styles.container}>
      <SettingsButton />
      <Text style={styles.title}>Collaborators</Text>

      {/* Collaborator List */}
      {collaborators.map((collaborator) => (
        <Card key={collaborator.id} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.leftSection}>
              <Text style={styles.collaboratorName}>{collaborator.name}</Text>
              <Text style={styles.collaboratorDetails}>{collaborator.role} | {collaborator.email}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      <ActionButton /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
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
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Collaborators;
