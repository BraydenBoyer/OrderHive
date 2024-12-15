// tabs/dashboardTab/index.jsx
import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import WidgetButton from '../../../components/WidgetButton';
import { AppContext } from "../_layout.jsx";
import { useFocusEffect } from "expo-router";
import {StatusBar} from "expo-status-bar";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx";
import {MySurface} from "../../../components/MySurface.jsx";
import {MyButton} from "../../../components/inputs/MyButton.jsx";
import {InventoryCard} from "../../../components/InventoryCard.jsx";
import {MyWidgetButton} from "../../../components/MyWidgetButton.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;

export default function DashboardPage() {

  useFocusEffect(
    useCallback(() => {


      return () => {
        // Cleanup when screen is unfocused
      };
    }, [])
  );

  return (
    <BackDrop title='Dashboard'>
      <View>

        {/* Dashboard Widgets */}
        <View style={styles.widgetContainer}>

          <MyWidgetButton
              title="Order Creation"
              route="dashboardTab/OrderCreation"
          />
          <MyWidgetButton
            title="Pickup"
            route="dashboardTab/Pickup"
          />
          <MyWidgetButton
            title="Sales Forecast"
            route="dashboardTab/SalesForecasting"
          />
          <MyWidgetButton
            title="Product Analysis"
            route="dashboardTab/ProductAnalysis"
          />

          <MyWidgetButton
              title="Collection Info"
              route="dashboardTab/CollectionInfo"
              style={[styles.widget, ]}
          />
          <MyWidgetButton
              title='Collab'
              route="dashboardTab/Collaborator"
              style={[styles.widget,]}
          />

        </View>
      </View>
    </BackDrop>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  widgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  widget: {
    width: '45%', // Set to approximately half the width to allow two widgets per row
    aspectRatio: 1.2, // Adjust for a balanced height-to-width ratio
    backgroundColor: lightTheme.colors.primaryContainer, // Light pink background
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
});
