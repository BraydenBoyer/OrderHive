import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, FlatList, TouchableOpacity, View, Modal, Button } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;

const pickups = [
  {
    id: '1',
    name: 'Barry Allen',
    date: '10/3/24',
    items: [
      { itemName: 'Apples - 1 kg', price: '$5' },
      { itemName: 'Milk - 1 liter', price: '$2' }
    ],
    totalPrice: '$7',
  },
  {
    id: '2',
    name: 'Allen Barry',
    date: '10/9/24',
    items: [
      { itemName: 'Bananas - 1 kg', price: '$4' },
      { itemName: 'Bread - 1 loaf', price: '$8' }
    ],
    totalPrice: '$12',
  },
  {
    id: '3',
    name: 'Aarry Ballen',
    date: '10/7/24',
    items: [
      { itemName: 'Chicken Breast - 500 g', price: '$6' },
      { itemName: 'Coffee - 200 g', price: '$8' }
    ],
    totalPrice: '$14',
  },
];

export default function Pickup() {
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredPickups, setFilteredPickups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardPress = (item) => {
    setSelectedPickup(item.id === selectedPickup ? null : item.id);
  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      setFilteredPickups([]);
      setIsModalVisible(false);
    } else {
      // Case-sensitive search for exact matches
      const filteredData = pickups.filter(pickup => pickup.name.includes(searchText));

      if (filteredData.length > 0) {
        setFilteredPickups(filteredData);
        setIsModalVisible(true);
      } else {
        setFilteredPickups([]);
        setIsModalVisible(false);
      }
    }
  };

  return (
    <BackDrop title="Pickups" mainHeader={false}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surfaceVariant }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.onSurface }]}
          placeholder="Search by name (case-sensitive)"
          placeholderTextColor={colors.onSurfaceVariant}
          value={searchText}
          onChangeText={setSearchText}
        />
        <IconButton
          icon="magnify"
          color={colors.onSurfaceVariant}
          size={20}
          style={styles.searchIcon}
          onPress={handleSearch} // Trigger search on press
        />
      </View>

      {/* Modal for search results */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={filteredPickups}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Card style={[styles.card, { backgroundColor: colors.surface }]}>
                    <View style={styles.cardContent}>
                      <View style={styles.cardLeft}>
                        <Text style={[styles.name, { color: colors.onSurface }]}>{item.name}</Text>
                        <Text style={[styles.date, { color: colors.onSurfaceVariant }]}>
                          {item.date}
                        </Text>
                      </View>
                      <Text style={[styles.price, { color: colors.primary, textAlign: 'right' }]}>
                        Total Price: {item.totalPrice}
                      </Text>
                    </View>
                    <View style={[styles.itemsList]}>
                      {item.items.map((itemDetail, index) => (
                        <View key={index} style={styles.itemDetailContainer}>
                          <Text style={[styles.itemDetail, { color: colors.onSurfaceVariant }]}>
                            {itemDetail.itemName}
                          </Text>
                          <Text style={[styles.itemPrice, { color: colors.primary }]}>
                            {itemDetail.price}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </Card>
                </View>
              )}
            />
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

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
                    {item.date}
                  </Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={[styles.price, { color: colors.primary }]}>{item.totalPrice}</Text>
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
                  <Text style={[styles.categoryTitle, { color: colors.onSurface }]}>Order Details</Text>
                  {item.items.map((itemDetail, index) => (
                    <View key={index} style={styles.itemDetailContainer}>
                      <Text style={[styles.itemDetail, { color: colors.onSurfaceVariant }]}>
                        {itemDetail.itemName}
                      </Text>
                      <Text style={[styles.itemPrice, { color: colors.primary }]}>
                        {itemDetail.price}
                      </Text>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
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
  cardLeft: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemsList: {
    paddingTop: 10,
  },
  itemDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  itemDetail: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    textAlign: 'right',
  },
  extraContent: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moreIcon: {
    marginTop: 5,
  },
});
