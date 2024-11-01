// tabs/dashboardTab/Pickup.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import SettingsButton from '../../../components/SettingsButton';
import ActionButton from '../../../components/ActionButton';

const pickups = [
  { id: '1', name: 'Barry Allen', date: '10/3/24', items: 10, price: '$50' },
  { id: '2', name: 'Barry Allen', date: '10/3/24', items: 10, price: '$50' },
  { id: '3', name: 'Barry Allen', date: '10/3/24', items: 10, price: '$50' },
];

export default function Pickup() {
  return (
    <View style={styles.container}>
      <SettingsButton />
      <Text style={styles.title}>Pickups</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Hinted search text"
        />
        <IconButton
          icon="magnify"
          color="#6e6e6e"
          size={20}
          style={styles.searchIcon}
        />
      </View>

      <FlatList
        data={pickups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.leftSection}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>{item.date} • {item.items} items</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.price}>{item.price}</Text>
                <IconButton
                  icon="dots-vertical"
                  color="#6e6e6e"
                  size={20}
                  style={styles.moreIcon}
                />
              </View>
            </View>
          </Card>
        )}
      />

    </View>
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#6e6e6e',
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#f8c8c8',
    marginBottom: 15,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  leftSection: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#6e6e6e',
    marginTop: 5,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreIcon: {
    marginTop: 5,
  },
});
