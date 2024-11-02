// tabs/dashboardTab/index.jsx
import React, {useCallback, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackDrop } from "../../../components/Backdrop.jsx";
import WidgetButton from '../../../components/WidgetButton';
import ActionButton from '../../../components/ActionButton';
import SettingsButton from '../../../components/SettingsButton';
import {AppContext} from "../_layout.jsx";
import {useFocusEffect} from "expo-router";

export default function DashboardPage() {

  const {setFabVisible, setIcon, setActions} = useContext(AppContext)

  useFocusEffect(
      useCallback(() => {
        // If you want to do something when screen is focused
        setFabVisible(true)
        setIcon(['cloud', 'minus'])
        setActions(
            [
              {
                icon: 'menu',
                label: 'testing action',
                onPress: () => { return console.log('Clicked FAB plus')},
                size: 'large'
              }
            ]
        )

        return () => {
          // If you want to do something when screen is unfocused

        }
      }, [])
  )


  return (
    <BackDrop>
      <View style={styles.container}>
        <SettingsButton />
        <Text style={styles.title}>Dashboard</Text>

        {/* Dashboard Widgets */}
        <WidgetButton title="Collection Info" route="dashboardTab/CollectionInfo" />
        <WidgetButton title="Collaborator" route="dashboardTab/Collaborator" />
        <WidgetButton title="Pickup" route="dashboardTab/Pickup" />
        <WidgetButton title="Sales Forecasting" route="dashboardTab/SalesForecasting" />
        <WidgetButton title="Order Assembly" route="dashboardTab/OrderAssembly" />
        <WidgetButton title="Product Analysis" route="dashboardTab/ProductAnalysis" />
        <ActionButton />
      </View>
    </BackDrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
