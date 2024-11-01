// components/SettingsButton.jsx
import React from 'react';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';

const SettingsButton = () => {
  return (
    <IconButton
      icon="cog"
      color="#6e6e6e"
      size={24}
      onPress={() => router.navigate('dashboardTab/settings')}
      style={{ position: 'absolute', top: 10, right: 10 }}
    />
  );
};

export default SettingsButton;
