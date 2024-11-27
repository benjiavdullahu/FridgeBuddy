/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { fetchItems, deleteItem } from "../database/database";
import { useFocusEffect } from "@react-navigation/native";

const ItemList = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadItems = () => {
    fetchItems(setItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const handleDelete = (id) => {
    deleteItem(id, () => {
      loadItems();
      setSelectedItemId(null);
      setShowDeleteModal(false);
    });
  };

  const toggleDropdown = (id) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.leftSide}>
              {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text>No Image</Text>
                </View>
              )}
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.expiry}>Expiry: {item.expiryDate}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => toggleDropdown(item.id)}
            >
              <Text style={styles.menuText}>⋮</Text>
            </TouchableOpacity>
            {selectedItemId === item.id && (
              <View style={styles.dropdownMenu}>
                <Button
                  title="Edit"
                  onPress={() => {
                    navigation.navigate("ItemForm", { item: item });
                    setSelectedItemId(null);
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => setShowDeleteModal(true)}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.viewRecipesButton}
              onPress={() =>
                navigation.navigate("RecipeView", { ingredient: item.name })
              }
            >
              <Text style={styles.viewRecipesButtonText}>View Recipes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowDeleteModal(false)}
              />
              <Button
                title="Delete"
                onPress={() => handleDelete(selectedItemId)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#bfbfbf",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    position: "relative",
    borderRadius: 10,
  },
  leftSide: {
    flexDirection: "column",
    alignItems: "center",
  },
  rightSide: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  expiry: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  menuButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  menuText: {
    fontSize: 24,
  },
  buttonContainer: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  dropdownMenu: {
    position: "absolute",
    right: 10,
    top: 35,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
    width: 110,
  },
  viewRecipesButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#3353d1",
    padding: 10,
    borderRadius: 5,
  },
  viewRecipesButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
});

export default ItemList;
