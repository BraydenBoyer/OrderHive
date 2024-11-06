import { Tabs, useFocusEffect } from "expo-router";
import { View, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import { Text, Button, Checkbox, Card, IconButton, useTheme, Divider } from "react-native-paper";
import { router } from 'expo-router';
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import { MyFAB } from "../../../components/overlays/FAB.jsx";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../_layout.jsx";

const initialInventoryData = [
  { id: 1, category: "Lettuce", name: "Butter Bib", price: "$50", total: 8, hold: 5, source: "HG Farm", type: "Greens" },
  { id: 2, category: "Lettuce", name: "Red Romaine", price: "$50", total: 8, hold: 5, source: "HG Farm", type: "Greens" },
  { id: 3, category: "Bread", name: "Italian Bread", price: "$50", total: 8, hold: 5, source: "HG Farm", type: "Bread" }
];

export default function InventoryPage() {
  const [isDeleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');

  const { setFabVisible, setIcon, setActions } = useContext(AppContext);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId) ? prevSelected.filter((id) => id !== itemId) : [...prevSelected, itemId]
    );
  };

  const handleDeleteItems = () => {
    setInventoryData((prevData) => prevData.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setDeleteMode(false);
  };

  const handleAddItems = () => {
    if (!newItemName || !newItemPrice || !newItemCategory) return;

    const newItem = {
      id: inventoryData.length + 1,
      category: newItemCategory,
      name: newItemName,
      price: `$${newItemPrice}`,
      total: 0,
      hold: 0,
      source: "HG Farm",
      type: newItemCategory,
    };

    setInventoryData([...inventoryData, newItem]);
    setAddModalVisible(false);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemCategory('');
  };

  const exampleActions = [
    {
      icon: 'plus',
      label: 'Add Item',
      onPress: () => setAddModalVisible(true),
    },
    {
      icon: 'delete',
      label: 'Delete Selected',
      onPress: () => setDeleteMode(true),
    }
  ];

  useFocusEffect(
    useCallback(() => {
      setFabVisible(true);
      setActions(exampleActions);
      setIcon(['plus', 'minus']); // Set to desired icons

      return () => {
        setFabVisible(false);
      };
    }, [setFabVisible, setActions, setIcon])
  );

  return (
    <BackDrop style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inventoryList}>
          {["Lettuce", "Bread"].map((category) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {inventoryData
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card key={item.id} style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                      {isDeleteMode && (
                        <Checkbox
                          status={selectedItems.includes(item.id) ? "checked" : "unchecked"}
                          onPress={() => handleSelectItem(item.id)}
                        />
                      )}
                      <View style={styles.cardText}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                        <Text style={styles.details}>Total: {item.total}   Hold: {item.hold}</Text>
                        <Text style={styles.categorySource}>
                          {item.type} | {item.source}
                        </Text>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {isDeleteMode && (
        <View style={styles.deleteFooter}>
          <IconButton
            icon="delete"
            size={30}
            color="red"
            onPress={handleDeleteItems}
            style={styles.trashIcon}
          />
          <Button mode="text" onPress={() => setDeleteMode(false)} style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
      )}

      <Modal
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Item</Text>
            <TextInput
              placeholder="Product Name"
              style={styles.input}
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <TextInput
              placeholder="Sales Cost"
              style={styles.input}
              keyboardType="numeric"
              value={newItemPrice}
              onChangeText={setNewItemPrice}
            />
            <TextInput
              placeholder="Category (e.g., Lettuce, Bread)"
              style={styles.input}
              value={newItemCategory}
              onChangeText={setNewItemCategory}
            />
            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={() => setAddModalVisible(false)} style={styles.cancelButton}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleAddItems} style={styles.confirmButton}>
                Confirm
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </BackDrop>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    alignItems: "center",
  },
  inventoryList: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  categorySection: {
    width: "100%",
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    width: "100%",
    marginBottom: 8,
    backgroundColor: "#f0e6f6",
    borderRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    marginLeft: 8,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  categorySource: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  deleteFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    backgroundColor: "#f8d7da",
    alignItems: "center",
  },
  trashIcon: {
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    fontSize: 16,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    fontSize: 16,
  },
  confirmButton: {
    fontSize: 16,
  },
});
