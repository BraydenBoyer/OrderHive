// components/ActionButton.jsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Modal, Button, Portal } from 'react-native-paper';

const ActionButton = () => {
  const [visible, setVisible] = useState(false);

  const openForm = () => setVisible(true);
  const closeForm = () => setVisible(false);

  return (
    <Portal>
      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={openForm}>
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>

      {/* Form Modal */}
      <Modal visible={visible} onDismiss={closeForm} contentContainerStyle={styles.modal}>
        <Text style={styles.title}>Order Actions</Text>

        {/* Add Order Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add Order</Text>
          <View style={styles.formField}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Jim John" />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput style={styles.input} placeholder="Lettuce" />
            <TextInput style={styles.quantityInput} placeholder="3" />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Notes</Text>
            <TextInput style={styles.input} placeholder="-" />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Collection</Text>
            <TextInput style={styles.input} placeholder="HG Farm" />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} placeholder="mm/dd/yyyy" />
          </View>

          <Button mode="contained" onPress={() => console.log('Order Added')}>Add Order</Button>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button mode="outlined" onPress={() => console.log('Remove Order')}>Remove Order</Button>
          <Button mode="outlined" onPress={() => console.log('Edit Order')}>Edit Order</Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    fontSize: 28,
    color: '#000',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    width: 60,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ActionButton;
