/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { insertItem, updateItem } from "../database/database";
import * as Notifications from "expo-notifications";

const ItemForm = ({ route, navigation }) => {
  const { item, imageUri: routeImageUri } = route.params || {};
  const [name, setName] = useState(item?.name || "");
  const [expiryDate, setExpiryDate] = useState(
    item ? new Date(item.expiryDate) : new Date()
  );
  const [description, setDescription] = useState(item?.description || "");
  const [imageUri, setImageUri] = useState(
    item?.imageUri || routeImageUri || ""
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const scheduleNotification = async (item) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to start of day to avoid timezone issues
    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0); // Ensure expiry date is also normalized

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const daysUntilExpiry = Math.round(
      (expiry.getTime() - today.getTime()) / oneDay
    );

    const notifyDays = [7, 5, 3, 1]; // Days on which to send notifications
    notifyDays.forEach((day) => {
      let daysBeforeNotification = daysUntilExpiry - day;
      if (daysBeforeNotification >= 0) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: `Expiry Alert for ${item.name}!`,
            body: `${item.name} expires in ${day} days!`,
          },
          trigger: {
            seconds: daysBeforeNotification * 86400, // Convert days to seconds
            repeats: false,
          },
        });
        console.log(`Notification scheduled for ${item.name} in ${day} days.`);
      }
    });
  };

  const handleSave = async () => {
    const formattedDate = expiryDate.toISOString().split("T")[0];
    const itemToSave = {
      name,
      expiryDate: formattedDate,
      description,
      imageUri,
    };

    const onSuccess = (success) => {
      if (success) {
        scheduleNotification(itemToSave);
        Alert.alert("Success", "Item saved successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to save item.");
      }
    };

    if (item) {
      updateItem(
        item.id,
        name,
        formattedDate,
        description,
        imageUri,
        onSuccess
      );
    } else {
      insertItem(name, formattedDate, description, imageUri, onSuccess);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date"
        value={expiryDate.toISOString().split("T")[0]}
        onFocus={() => setShowDatePicker(true)}
        editable={!showDatePicker}
      />
      {showDatePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === "android");
            if (selectedDate) {
              selectedDate.setHours(0, 0, 0, 0);
              setExpiryDate(new Date(selectedDate));
            }
          }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Save Item" onPress={handleSave} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default ItemForm;
