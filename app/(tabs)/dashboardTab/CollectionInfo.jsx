// tabs/dashboardTab/CollectionInfo.jsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;

export default function CollectionInfo() {
  return (
    <BackDrop title="Collection Info" mainHeader={false}>
      <Text style={[styles.text, { color: colors.onBackground }]}>
        This is the Collection Info screen.
      </Text>
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
