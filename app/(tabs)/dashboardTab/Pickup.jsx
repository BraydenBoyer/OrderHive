// tabs/dashboardTab/Pickup.jsx
import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, FlatList, TouchableOpacity, View } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import {BackDrop} from "../../../components/overlays/Backdrop.jsx";

const pickups = [
  { id: '1', name: 'Barry Allen', date: '10/3/24', items: 10, price: '$50' },
  { id: '2', name: 'Allen Barry', date: '10/9/24', items: 14, price: '$60' },
  { id: '3', name: 'Aarry Ballen', date: '10/7/24', items: 18, price: '$70' },
];

// Synthetic grocery list data
const groceryItems = [
  { category: 'Fruits & Vegetables', items: ['Apples - 1 kg'] },
  { category: 'Dairy', items: ['Milk - 1 liter'] },
  { category: 'Grains & Cereals', items: ['Rice - 1 kg'] },
  { category: 'Meat & Seafood', items: ['Chicken Breast - 500 g'] },
  { category: 'Snacks & Beverages', items: ['Coffee - 200 g'] },
  { category: 'Condiments & Spices', items: ['Olive Oil - 500 ml'] },
  { category: 'Canned & Packaged Goods', items: ['Baked Beans - 1 can'] },
  { category: 'Bakery & Bread', items: ['Whole Wheat Bread - 1 loaf'] },
  { category: 'Frozen Items', items: ['Frozen Peas - 500 g'] },
  { category: 'Household Essentials', items: ['Dish Soap - 500 ml'] },
];

export default function Pickup() {
  const [selectedPickup, setSelectedPickup] = useState(null);

  const handleCardPress = (item) => {
    setSelectedPickup(item.id === selectedPickup ? null : item.id);
  };

  return (
    <BackDrop title="Pickups" mainHeader={false}>

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
          <TouchableOpacity onPress={() => handleCardPress(item)}>
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
              {selectedPickup === item.id && (
                <View style={styles.extraContent}>
                  {groceryItems.map((category, index) => (
                    <View key={index} style={styles.categoryContainer}>
                      <Text style={styles.categoryTitle}>{category.category}</Text>
                      {category.items.map((groceryItem, idx) => (
                        <Text key={idx} style={styles.groceryItem}>{groceryItem}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </Card>
          </TouchableOpacity>
        )}
      />
    </BackDrop>
  );
}

const styles = StyleSheet.create({
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
  extraContent: {
    padding: 10,
    backgroundColor: '#eaeaea',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  groceryItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
});
