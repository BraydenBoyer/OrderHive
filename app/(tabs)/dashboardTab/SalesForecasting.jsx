// tabs/dashboardTab/SalesForecasting.jsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import { MyFAB } from "../../../components/overlays/FAB.jsx"; 
const actions = [
  {
    icon: 'chart-line',
    label: 'View Forecast',
    onPress: () => console.log('Clicked View Forecast'),
    size: 'large',
  },
  {
    icon: 'refresh',
    label: 'Refresh Data',
    onPress: () => console.log('Clicked Refresh Data'),
    size: 'large',
  },
  {
    icon: 'share-variant',
    label: 'Share Forecast',
    onPress: () => console.log('Clicked Share Forecast'),
    size: 'large',
  },
];

export default function SalesForecasting() {
  return (
    <BackDrop title="Sales Forecasting" mainHeader={false}>
      <Text style={styles.text}>This is the Sales Forecasting screen.</Text>
      <MyFAB actions={actions} visible={true} />
    </BackDrop>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});