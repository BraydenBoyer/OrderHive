import { Tabs, useFocusEffect } from "expo-router";
import { View, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import { Text, Button, Checkbox, Card, IconButton, Divider, useTheme, FAB } from "react-native-paper";
import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../_layout.jsx";
import { addInventoryItem } from '../../firebase/addItem.js';
import { fetchInventoryData } from '../../firebase/fetchInventory.js';
import { colors } from "../../styles/themes/colors/lightTheme.jsx";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";


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
  const [newItemTotal, setNewItemTotal] = useState('');
  const [newItemHold, setNewItemHold] = useState('');
  const [newItemSource, setNewItemSource] = useState('');
  const [fabOpen, setFabOpen] = useState(false);



    const theme = useTheme()
    const colors = theme.colors;

/*
useEffect(() => {
    const fetchData = async () => {
      const data = await fetchInventoryData();
      console.log("Fetched inventory data:", data);  // Console log to verify data
      setInventoryData(data); // Update state with fetched data
    };

    fetchData();
  }, []);
  */
/*
  useFocusEffect(
    useCallback(() => {
      setFabVisible(true);
      setActions([
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
      ]);
      setIcon(['plus', 'minus']);
      return () => setFabVisible(false);
    }, [setFabVisible, setActions, setIcon])
  );
*/
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

  const handleAddItems = async () => {
    if (!newItemCategory || !newItemName || !newItemPrice || !newItemTotal || !newItemHold || !newItemSource) return;

    const newItem = {
      category: newItemCategory,
      name: newItemName,
      price: newItemPrice,
      total: newItemTotal,
      hold: newItemHold,
      source: newItemSource,
    };

    const result = await addInventoryItem(
      newItem.category,
      newItem.name,
      newItem.price,
      newItem.total,
      newItem.hold,
      newItem.source
    );

    if (result === true) {
      setInventoryData([...inventoryData, newItem]);
      setAddModalVisible(false);
      clearInputFields();
    } else {
      console.log("Error adding item:", result);
    }
  };

  const clearInputFields = () => {
    setNewItemCategory('');
    setNewItemName('');
    setNewItemPrice('');
    setNewItemTotal('');
    setNewItemHold('');
    setNewItemSource('');
  };

  const handleFabStateChange = ({ open }) => setFabOpen(open);

  return (
      <BackDrop title={"InventoryTab"}>
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inventoryList}>
          {["Lettuce", "Bread"].map((category) => (
            <View key={category} style={styles.categorySection}>
              <Text style={[styles.categoryTitle, { color: colors.onBackground }]}>{category}</Text>
              {inventoryData
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card key={item.id} style={[styles.card, { backgroundColor: colors.primary }]}>
                    <Card.Content style={styles.cardContent}>
                      {isDeleteMode && (
                        <Checkbox
                          status={selectedItems.includes(item.id) ? "checked" : "unchecked"}
                          onPress={() => handleSelectItem(item.id)}
                        />
                      )}
                      <View style={styles.cardText}>
                        <Text style={[styles.itemName, { color: colors.onSurface }]}>{item.name}</Text>
                        <Text style={[styles.price, { color: colors.onSurfaceVariant }]}>{item.price}</Text>
                        <Text style={[styles.details, { color: colors.onSurfaceVariant }]}>Total: {item.total}   Hold: {item.hold}</Text>
                        <Text style={[styles.categorySource, { color: colors.onSurfaceVariant }]}>
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
        <View style={[styles.deleteFooter, { backgroundColor: colors.errorContainer }]}>
          <IconButton
            icon="delete"
            size={30}
            color={colors.onError}
            onPress={handleDeleteItems}
            style={styles.trashIcon}
          />
          <Button mode="text" onPress={() => setDeleteMode(false)} style={styles.cancelButton} color={colors.onError}>
            Cancel
          </Button>
        </View>
      )}
      <FAB.Group
        open={fabOpen}
        icon={fabOpen ? 'close' : 'plus'}
        actions={[
          { icon: 'plus', label: 'Add Item', onPress: () => setAddModalVisible(true) },
          { icon: 'delete', label: 'Delete Selected', onPress: () => setDeleteMode(true) },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        style={styles.fab}
      />
      <Modal
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.onSurface }]}>Add Item</Text>
            <TextInput placeholder="Product Name" style={styles.input} value={newItemName} onChangeText={setNewItemName} />
            <TextInput placeholder="Sales Cost" style={styles.input} keyboardType="numeric" value={newItemPrice} onChangeText={setNewItemPrice} />
            <TextInput placeholder="Category (e.g., Lettuce, Bread)" style={styles.input} value={newItemCategory} onChangeText={setNewItemCategory} />
            <TextInput placeholder="Total Quantity" style={styles.input} keyboardType="numeric" value={newItemTotal} onChangeText={setNewItemTotal} />
            <TextInput placeholder="Hold Quantity" style={styles.input} keyboardType="numeric" value={newItemHold} onChangeText={setNewItemHold} />
            <TextInput placeholder="Source (e.g., HG Farm)" style={styles.input} value={newItemSource} onChangeText={setNewItemSource} />

            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={() => setAddModalVisible(false)} style={styles.cancelButton} color={colors.onSurface}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleAddItems} style={styles.confirmButton} color={colors.primary}>
                Confirm
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </BackDrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    marginBottom: 4,
  },
  categorySource: {
    fontSize: 12,
    fontStyle: "italic",
  },
  deleteFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    alignItems: "center",
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
});
