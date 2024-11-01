// tabs/dashboardTab/SalesForecasting.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SalesForecasting() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Sales Forecasting screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});
