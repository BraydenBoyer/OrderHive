import { Tabs, useFocusEffect, useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import {
  Text,

  Checkbox,
  Card,
  IconButton,
  Divider,
  useTheme,
  FAB,
  Menu,
  Searchbar,
  ActivityIndicator
} from "react-native-paper";
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
import {BottomButtons} from "../../../components/overlays/BottomButtons.jsx";
import {InventoryCard} from "../../../components/InventoryCard.jsx";
import {MySeachBar} from "../../../components/MySeachBar.jsx";
import {MyTextInput} from "../../../components/inputs/MyTextInput.jsx";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';




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

  const [currentOrg, setCurrentOrg] = useState('')
  const [allOrgs , setAllOrgs] = useState([])
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([])

   const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
    const orgName = "Org." + globalVariable.currentOrg

  //for local fab
  const [visible, setVisible] = useState(false)

  const [groupedInventoryData, setGroupedInventoryData] = useState({});

    const router = useRouter()


    const theme = useTheme()
    const colors = theme.colors;

    const navigation = useNavigation();

    //how items are shown when inventory component is mounted


    const fetchData = async () => {
        try {
            const orgName = "Org." + globalVariable.currentOrg;
            const inventoryRef = collection(fireDb, `organizations/${orgName}/inventory`);
            const inventorySnapshot = await getDocs(inventoryRef);

            const groupedData = {};
            const dropArray = [];
            const currOrg = globalVariable.currentOrg;

            setCurrentOrg(currOrg);

            const organizations = await getAllOrganizations();
            setAllOrgs(organizations);

            console.log("fetched organizations", organizations);

            for (const categoryDoc of inventorySnapshot.docs) {
                const categoryName = categoryDoc.id; // e.g., "Barley" or "Water"

                dropArray.push({ label: categoryName, value: categoryName }); // Adjusted format

                const itemsRef = collection(fireDb, `organizations/${orgName}/inventory/${categoryName}/items`);
                const itemsSnapshot = await getDocs(itemsRef);

                const items = itemsSnapshot.docs.map((doc) => {
                    const item = { id: doc.id, ...doc.data() };
                    console.log(`Fetched item in category '${categoryName}':`, item);
                    return item;
                });

                groupedData[categoryName] = items;

                console.log(`Items in category '${categoryName}':`, items);
            }

            setGroupedInventoryData(groupedData);
            setDropdownItems(dropArray);
            console.log('Dropdown items:', dropArray);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        }
    };



useFocusEffect(
    useCallback(() => {
      // Fetch data when the screen is focused
      fetchData();

      return () => {
        // Clear state when the screen is unfocused
        setGroupedInventoryData({});
        setDropdownItems([]);
        setNewItemName('');
        setNewItemPrice('');
        setNewItemCategory('');
        setNewItemTotal('');
        setNewItemHold('');
        setSelectedItems([]);
        setDeleteMode(false);
      };
    }, [])
  );



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
        const orgName = globalVariable.currentOrg
      const inventoryRef = collection(fireDb, 'organizations/'+orgName+'/inventory');
      const inventorySnapshot = await getDocs(inventoryRef);

      for (const itemName of itemNames) {
        let itemDeleted = false;

        for (const categoryDoc of inventorySnapshot.docs) {
          const categoryName = categoryDoc.id;

          const itemsRef = collection(fireDb, 'organizations/'+orgName+'/inventory', categoryName, "items");
          const itemsSnapshot = await getDocs(itemsRef);

          for (const itemDoc of itemsSnapshot.docs) {
            const itemData = itemDoc.data();

            if (itemData.name === itemName) {
              const itemRef = doc(fireDb, 'organizations/'+orgName+'/inventory', categoryName, "items", itemDoc.id);
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
      const itemRef = doc(fireDb, 'organizations/'+orgName+'/inventory', categoryName, "items", inventoryID);
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

  };

  const handleAddItems = async () => {
    if (!newItemCategory || !newItemName || !newItemPrice || !newItemTotal || !newItemHold) {
      console.warn("All fields are required to add a new item.");
      return;
    }

    // Capitalize the first letter of the category and make the rest lowercase
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const normalizedCategory = capitalize(newItemCategory.trim());
    console.log("Normalized Category:", normalizedCategory);

    const newItem = {
      category: normalizedCategory,
      name: newItemName, // Add the "name" field to the item
      price: newItemPrice,
      total: newItemTotal,
      hold: newItemHold,
    };

    try {
      const orgName = "Org." + globalVariable.currentOrg; // Current organization
      const categoryDocRef = doc(fireDb, `organizations/${orgName}/inventory`, normalizedCategory);

      //ensure the category document is created with a field matching the category name
      await setDoc(categoryDocRef, { [normalizedCategory]: "" }, { merge: true });

      const itemDocRef = doc(collection(categoryDocRef, "items")); // Path to items subcollection
      await setDoc(itemDocRef, newItem); // Add the new item

      // Immediately update grouped data in the UI
      const updatedGroupedData = { ...groupedInventoryData };
      updatedGroupedData[normalizedCategory] = [
        ...(updatedGroupedData[normalizedCategory] || []),
        { ...newItem, id: itemDocRef.id }, // Add unique ID
      ];
      setGroupedInventoryData(updatedGroupedData);

      console.log("Added new item:", newItem);
      setAddModalVisible(false);
      clearInputFields();
    } catch (error) {
      console.error("Error adding item or creating category:", error);
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

  const [searchTxt, setSearchTxt] = useState('')

   const filteredData = Object.fromEntries(
     Object.entries(groupedInventoryData).map(([category, items]) => [
       category,
       items.filter((item) =>
         item.name.toLowerCase().includes(searchTxt.toLowerCase())
       ),
     ])
   );

const navigateToModifyItem = (item) => {
  navigation.navigate('ModifyItemPage', { itemData: JSON.stringify(item) });
};
  return (

      <BackDrop title={"InventoryTab"} >

        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>

            <MySeachBar
                placeholder={'Search'}
                value={searchTxt}
                onChangeText={setSearchTxt}
                style={{marginBottom: 20}}
            />

            {
              Object.keys(filteredData).length === 0 ?
                  <ActivityIndicator
                      animating={true}
                      size={'large'}
                  />
                  :
                  <View style={styles.inventoryList}>
                    {Object.keys(filteredData).map((category) => (
                        <View key={category} style={styles.categorySection}>

                          <Text variant={'titleLarge'} style={[styles.categoryTitle]}>
                            {category}
                          </Text>
                          {filteredData[category].map((item) => {
                            console.log("Rendering item:", item); // Log the item being rendered
                            return (
                                 <InventoryCard
                                   title={item.name}
                                   inventory={item.total}
                                   claimed={item.hold}
                                   metadata={['Lettuce', 'Greens', 'Hydroponic']}
                                   retail={item.price}
                                   wholesale={item.wholesale}
                                   checkboxVisible={isDeleteMode}
                                   checkboxStatus={selectedItems.includes(item.id) ? "checked" : "unchecked"}
                                   onCheckboxPress={() => handleSelectItem(item.id)}
                                   onClick={() => navigateToModifyItem(item)}
                                 />
                                                             );
                                                           })}
                        </View>
                    ))}
                  </View>
            }


          </ScrollView>

          {isDeleteMode && (
              <View style={[styles.deleteFooter, { backgroundColor: colors.errorContainer }]}>
                <BottomButtons
                    visible={true} // Toggle visibility
                    firstTitle="Delete"
                    secondTitle="Cancel"
                    firstOnClick={() => {
                      // Logic for delete action
                      console.log("Delete action triggered");
                      handleDeleteItems();
                    }}
                    secondOnClick={() => {
                      // Logic for cancel action
                      console.log("Cancel action triggered");
                      setDeleteMode(false); //reset delete mode
                    }}
                />

              </View>
          )}
        <LocalFAB visible={visible} icon={['plus', 'close']} actions={[
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
                <MyTextInput placeholder="Product Name" style={styles.input} value={newItemName} onChangeText={setNewItemName} />
                <MyTextInput placeholder="Sales Cost" style={styles.input} keyboardType="numeric" value={newItemPrice} onChangeText={setNewItemPrice} />
                <MyTextInput placeholder="New Category (e.g., Lettuce, Bread)" style={styles.input} value={newItemCategory} onChangeText={setNewItemCategory} />
                <MyTextInput placeholder="Total Quantity" style={styles.input} keyboardType="numeric" value={newItemTotal} onChangeText={setNewItemTotal} />
                <MyTextInput placeholder="Hold Quantity" style={styles.input} keyboardType="numeric" value={newItemHold} onChangeText={setNewItemHold} />
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dropdownItems}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Category' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setNewItemCategory(item.value); // Update the category state
                    setValue(item.value); // Update dropdown's selected value
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
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                  <Button
                      mode="outlined"
                      onPress={() => setMenuVisible(true)}
                      style={styles.dropdownButton}
                  >
                    {currentOrg || "Select an Organization"}
                  </Button>

                }

                >
                  {allOrgs.map((org) => (
                      <Menu.Item
                          key={org.id}
                          onPress={() => handleSelectOrganization(org)}
                          title={org.name}
                      />
                  ))}
                </Menu>

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
    rowGap: 10
  },
  categoryTitle: {
    marginBottom: 8,
    fontWeight: 'bold'
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
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
