import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, FlatList, TouchableOpacity, View } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;

const pickups = [
  { id: '1', name: 'Barry Allen', date: '10/3/24', items: 10, price: '$50' },
  { id: '2', name: 'Allen Barry', date: '10/9/24', items: 14, price: '$60' },
  { id: '3', name: 'Aarry Ballen', date: '10/7/24', items: 18, price: '$70' },
];

// Enhanced grocery list data with price only
const groceryItems = [
  {
    category: 'Fruits & Vegetables',
    items: [
      { name: 'Apples - 1 kg', price: '$5' },
      { name: 'Bananas - 1 kg', price: '$4' }
    ],
  },
  {
    category: 'Dairy',
    items: [
      { name: 'Milk - 1 liter', price: '$2' },
      { name: 'Cheese - 200 g', price: '$4' }
    ],
  },
  {
    category: 'Grains & Cereals',
    items: [
      { name: 'Rice - 1 kg', price: '$3' }
    ],
  },
  {
    category: 'Meat & Seafood',
    items: [
      { name: 'Chicken Breast - 500 g', price: '$6' }
    ],
  },
  {
    category: 'Snacks & Beverages',
    items: [
      { name: 'Coffee - 200 g', price: '$8' }
    ],
  },
];

export default function Pickup() {
  const [selectedPickup, setSelectedPickup] = useState(null);

  const handleCardPress = (item) => {
    setSelectedPickup(item.id === selectedPickup ? null : item.id);
  };

  return (
    <BackDrop title="Pickups" mainHeader={false}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surfaceVariant }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.onSurface }]}
          placeholder="Hinted search text"
          placeholderTextColor={colors.onSurfaceVariant}
        />
        <IconButton
          icon="magnify"
          color={colors.onSurfaceVariant}
          size={20}
          style={styles.searchIcon}
        />
      </View>

      <FlatList
        data={pickups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <Card style={[styles.card, { backgroundColor: colors.surface }]}>
              <View style={styles.cardContent}>
                <View style={styles.leftSection}>
                  <Text style={[styles.name, { color: colors.onSurface }]}>{item.name}</Text>
                  <Text style={[styles.date, { color: colors.onSurfaceVariant }]}>
                    {item.date} • {item.items} items
                  </Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
                  <IconButton
                    icon="dots-vertical"
                    color={colors.onSurfaceVariant}
                    size={20}
                    style={styles.moreIcon}
                  />
                </View>
              </View>
              {selectedPickup === item.id && (
                <View style={[styles.extraContent, { backgroundColor: colors.surfaceVariant }]}>
                  {groceryItems.map((category, index) => (
                    <View key={index} style={styles.categoryContainer}>
                      <Text style={[styles.categoryTitle, { color: colors.onSurface }]}>
                        {category.category}
                      </Text>
                      {category.items.map((groceryItem, idx) => (
                        <View key={idx} style={styles.itemDetailContainer}>
                          <Text style={[styles.groceryItem, { color: colors.onSurfaceVariant }]}>
                            {groceryItem.name}
                          </Text>
                          <Text style={[styles.groceryItemDetail, { color: colors.primary }]}>
                            Price: {groceryItem.price}
                          </Text>
                        </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
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
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemDetailContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  groceryItem: {
    fontSize: 14,
  },
  groceryItemDetail: {
    fontSize: 12,
  },
});
