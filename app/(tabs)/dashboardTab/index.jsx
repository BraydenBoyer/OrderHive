// tabs/dashboardTab/index.jsx
import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import WidgetButton from '../../../components/WidgetButton';
import { AppContext } from "../_layout.jsx";
import { useFocusEffect } from "expo-router";

export default function DashboardPage() {
  const { setFabVisible, setIcon, setActions } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      setFabVisible(true);
      setIcon(['cloud', 'minus']);
      setActions([
        {
          icon: 'menu',
          label: 'testing action',
          onPress: () => console.log('Clicked FAB plus'),
          size: 'large',
        },
      ]);

      return () => {
        // Cleanup when screen is unfocused
      };
    }, [])
  );

  return (
    <BackDrop>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Dashboard Widgets */}
        <View style={styles.widgetContainer}>
          <WidgetButton title="Collection Info" route="dashboardTab/CollectionInfo" style={styles.widget} />
          <WidgetButton title="Collaborator" route="dashboardTab/Collaborator" style={styles.widget} />
          <WidgetButton title="Pickup" route="dashboardTab/Pickup" style={styles.widget} />
          <WidgetButton title="Sales Forecasting" route="dashboardTab/SalesForecasting" style={styles.widget} />
          <WidgetButton title="Order Assembly" route="dashboardTab/OrderAssembly" style={styles.widget} />
          <WidgetButton title="Product Analysis" route="dashboardTab/ProductAnalysis" style={styles.widget} />
        </View>
      </View>
    </BackDrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  widgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  widget: {
    width: '45%', // Set to approximately half the width to allow two widgets per row
    aspectRatio: 1.2, // Adjust for a balanced height-to-width ratio
    backgroundColor: '#f8c8c8', // Light pink background
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
