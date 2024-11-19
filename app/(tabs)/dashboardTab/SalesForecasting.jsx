// tabs/dashboardTab/SalesForecasting.jsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import {LocalFAB} from "../../../components/overlays/LocalFAB.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;
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
      <Text style={[styles.text, { color: colors.onBackground }]}>
        This is the Sales Forecasting screen.
      </Text>
      <LocalFAB actions={actions} visible={true} />
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