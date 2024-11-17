import { Tabs, useFocusEffect } from "expo-router";
import { View, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import { Text, Button, Checkbox, Card, IconButton, Divider, useTheme, FAB, Menu } from "react-native-paper";
import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../_layout.jsx";
import { addInventoryItem } from '../../firebase/addItem.js';
import { fetchInventoryData } from '../../firebase/fetchInventory.js';
import { colors } from "../../styles/themes/colors/lightTheme.jsx";
import { BackDrop } from "../../../components/overlays/Backdrop.jsx";
import {collection, doc, setDoc, query, where, getDocs, deleteDoc} from "firebase/firestore";
import { fireDb } from '../../firebase/initializeFirebase';
import {LocalFAB} from '../../../components/overlays/LocalFAB.jsx'
import {globalVariable} from '../../_layout.jsx'
import {getAllOrganizations} from '../../firebase/user/organizationFunctions.js'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function InventoryPage() {
  const [isDeleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
 // const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
const [selectedItem, setSelectedItem] = useState([])
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemTotal, setNewItemTotal] = useState('');
  const [newItemHold, setNewItemHold] = useState('');
  const [newItemSource, setNewItemSource] = useState('');
  const [currentOrg, setCurrentOrg] = useState('')
  const [allOrgs , setAllOrgs] = useState([])
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([])

  const [isFocus, setIsFocus] = useState(false)


  //for local fab
  const [visible, setVisible] = useState(false)

  const [groupedInventoryData, setGroupedInventoryData] = useState({});


    const theme = useTheme()
    const colors = theme.colors;


    //how items are shown when inventory component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference the 'inventory' collection
        const inventoryRef = collection(fireDb, 'inventory');
        const inventorySnapshot = await getDocs(inventoryRef);

        //initialize an object to store categories and their items
        const groupedData = {};

        const currOrg = globalVariable.currentOrg
        setCurrentOrg(currOrg);

        const organizations = await getAllOrganizations()
        setAllOrgs(organizations)
        console.log("fetched organizations", organizations) //works

        //loop through each category in the 'inventory' collection
        for (const categoryDoc of inventorySnapshot.docs) {
          const categoryName = categoryDoc.id; // e.g., "Barley" or "Water"

          //reference the 'items' subcollection within each category
          const itemsRef = collection(fireDb, 'inventory', categoryName, 'items');
          const itemsSnapshot = await getDocs(itemsRef);

          //map through each item in the 'items' subcollection and store the data
          const items = itemsSnapshot.docs.map((doc) => {
            const item = { id: doc.id, ...doc.data() }; // Add the document ID as 'id'
            console.log(`Fetched item in category '${categoryName}':`, item); // Log each item with its id
            return item;
          });

          //add category to groupedData
          groupedData[categoryName] = items;


          console.log(`Items in category '${categoryName}':`, items);
        }

        //set the grouped data in state
        setGroupedInventoryData(groupedData);

        //log the full grouped data structure after fetching and setting it in state
        console.log("Grouped Inventory Data after fetching and setting state:", groupedData);

      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, []);




  const handleSelectItem = (inventoryID) => {
    setSelectedItems((prevSelected) => {
      //check if item has been selected already
      const isSelected = prevSelected.includes(inventoryID);

      //add or remove item based on selection status
      const updatedSelected = isSelected
        ? prevSelected.filter((id) => id !== inventoryID)
        : [...prevSelected, inventoryID];

      console.log("Updated selected items (IDs):", updatedSelected); // Debugging log
      return updatedSelected;
    });
  };



  const deleteItemsByName = async (itemIDs) => {
    try {
      //map ids to names
      const itemNames = itemIDs.map((id) => getItemNameById(id)).filter(Boolean); // Filter out nulls

      //log item being deleted
      console.log("Item names for deletion:", itemNames);

      const inventoryRef = collection(fireDb, "inventory");
      const inventorySnapshot = await getDocs(inventoryRef);

      for (const itemName of itemNames) {
        let itemDeleted = false;

        for (const categoryDoc of inventorySnapshot.docs) {
          const categoryName = categoryDoc.id;

          const itemsRef = collection(fireDb, "inventory", categoryName, "items");
          const itemsSnapshot = await getDocs(itemsRef);

          for (const itemDoc of itemsSnapshot.docs) {
            const itemData = itemDoc.data();

            if (itemData.name === itemName) {
              const itemRef = doc(fireDb, "inventory", categoryName, "items", itemDoc.id);
              await deleteDoc(itemRef);
              console.log(`Deleted item '${itemName}' in category '${categoryName}'`);
              itemDeleted = true;
              break;
            }
          }

          if (itemDeleted) break;
        }

        if (!itemDeleted) {
          console.warn(`Item '${itemName}' not found in any category.`);
        }
      }

      console.log("All items processed for deletion.");
    } catch (error) {
      console.error("Error deleting items by name:", error);
    }
  };


  const handleDeleteItems = async () => {
    if (selectedItems.length === 0) {
      console.warn("No items selected for deletion.");
      return;
    }

    console.log("Items selected for deletion:", selectedItems);

    //update the UI by removing items from local state
    const updatedGroupedData = { ...groupedInventoryData };
    selectedItems.forEach((inventoryID) => {
      for (const categoryName in updatedGroupedData) {
        updatedGroupedData[categoryName] = updatedGroupedData[categoryName].filter(
          (item) => item.id !== inventoryID
        );

        if (updatedGroupedData[categoryName].length === 0) {
          delete updatedGroupedData[categoryName]; // Remove empty categories
        }
      }
    });

    setGroupedInventoryData(updatedGroupedData); // Update the UI immediately
    setSelectedItems([]); // Clear selected items

    try {
      //delete items from the database using deleteItemFromDatabase function
      await Promise.all(selectedItems.map((inventoryID) => deleteItemFromDatabase(inventoryID)));
      console.log("Items successfully deleted from Firestore.");
    } catch (error) {
      console.error("Error deleting items:", error);
      //ensure inventory matches database
      fetchInventoryData(); //data fetching logic
    }

    setDeleteMode(false); //exit delete
  };

const deleteItemFromDatabase = async (inventoryID) => {
  for (const categoryName in groupedInventoryData) {
    const categoryItems = groupedInventoryData[categoryName];
    const item = categoryItems.find((item) => item.id === inventoryID);

    if (item) {
      const itemRef = doc(fireDb, "inventory", categoryName, "items", inventoryID);
      await deleteDoc(itemRef);
      console.log(`Deleted item '${item.name}' from category '${categoryName}'`);
      return;
    }
  }

  throw new Error(`Item with ID '${inventoryID}' not found in database.`);
};
const getItemNameById = (inventoryID) => {
  for (const category in groupedInventoryData) {
    const foundItem = groupedInventoryData[category].find((item) => item.id === inventoryID);
    if (foundItem) {
      return foundItem.name; // Return the item's name
    }
  }
  return null; // Return null if not found
};

    const clearInputFields = () => {
      setNewItemName('');
      setNewItemPrice('');
      setNewItemCategory('');
      setNewItemTotal('');
      setNewItemHold('');
      setNewItemSource('');
    };

  const handleAddItems = async () => {
    if (!newItemCategory || !newItemName || !newItemPrice || !newItemTotal || !newItemHold || !newItemSource) {
      console.warn("All fields are required to add a new item.");
      return;
    }

    // Capitalize the first letter of the category and make the rest lowercase
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const normalizedCategory = capitalize(newItemCategory.trim());
    console.log(normalizedCategory)

    const newItem = {
      category: normalizedCategory,
      name: newItemName,
      price: newItemPrice,
      total: newItemTotal,
      hold: newItemHold,
      source: newItemSource,
    };

    try {
      const docRef = doc(collection(fireDb, "inventory", normalizedCategory, "items")); // Use normalized category
      await setDoc(docRef, newItem);

      // Immediately fetch updated inventory to refresh state
      const updatedGroupedData = { ...groupedInventoryData };
      updatedGroupedData[normalizedCategory] = [
        ...(updatedGroupedData[normalizedCategory] || []),
        { ...newItem, id: docRef.id }, // Add unique ID
      ];
      setGroupedInventoryData(updatedGroupedData); // Update state

      console.log("Added new item:", newItem);
      setAddModalVisible(false);
      clearInputFields();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
    //for local fab
    useFocusEffect(
        useCallback(() => {

            setVisible(true)

            return () => {
                setVisible(false)
            }
        }, [setVisible])
    )


  return (

      <BackDrop title={"InventoryTab"} >

          <Text style={styles.orgTitle}>{'Current Organization: ' + currentOrg || 'No Organization Selected'}</Text>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.inventoryList}>
              {Object.keys(groupedInventoryData).map((category) => (
                <View key={category} style={styles.categorySection}>
                  <Text style={[styles.categoryTitle, { color: colors.onBackground }]}>{category}</Text>
                  {groupedInventoryData[category].map((item) => {
                    console.log("Rendering item:", item); // Log the item being rendered
                    return (
                        <Card key={item.id || `${category}-${item.name}`} style={[styles.card, { backgroundColor: colors.secondary }]}>
                          <Card.Content style={styles.cardContent}>
                            {isDeleteMode && (
                                <Checkbox
                                  status={selectedItems.includes(item.id) ? "checked" : "unchecked"} // Use ID for selection
                                  onPress={() => handleSelectItem(item.id)} // Pass ID directly
                                />
                            )}
                            <View style={styles.cardText}>
                              <Text style={[styles.itemName, { color: colors.onSurface }]}>{item.name}</Text>
                              <Text style={[styles.price, { color: colors.onSurfaceVariant }]}>{item.price}</Text>
                              <Text style={[styles.details, { color: colors.onSurfaceVariant }]}>
                                Total: {item.total}   Hold: {item.hold}
                              </Text>
                              <Text style={[styles.categorySource, { color: colors.onSurfaceVariant }]}>
                                {item.type} | {item.source}
                              </Text>
                            </View>
                          </Card.Content>
                        </Card>
                    );
                  })}
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
        <LocalFAB visible={visible} icon={['plus', 'trashIcon']} actions={[
            { icon: 'plus', label: 'Add Item', onPress: () => setAddModalVisible(true) },
            { icon: 'delete', label: 'Delete Selected', onPress: () => setDeleteMode(true) },
            ]} />


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

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={allOrgs.map((org) => ({ label: org.name, value: org.id }))}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={newItemSource || 'Select an Organization'}
                      searchPlaceholder="Search Organizations..."
                      value={newItemSource}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setNewItemSource(item.label); // Update the selected organization
                        setIsFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <AntDesign
                          style={styles.icon}
                          color={isFocus ? 'blue' : 'black'}
                          name="Safety"
                          size={20}
                        />
                      )}
                    />
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
  orgTitle: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
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
