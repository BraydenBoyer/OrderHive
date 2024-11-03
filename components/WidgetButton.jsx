// components/WidgetButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const WidgetButton = ({ title, route, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => router.navigate(route)}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f8c8c8', // Light pink background color for a soft look
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    paddingVertical: 10, // Reduced padding to allow more control from parent container
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#353562',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WidgetButton;
