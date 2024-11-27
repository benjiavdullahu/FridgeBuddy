/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("foodstorage.db");

const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, name TEXT, expiryDate TEXT, description TEXT, imageUri TEXT);",
      [],
      () => console.log("Table created successfully"),
      (_, error) => console.log("Error creating table:", error)
    );
  });
};

const insertItem = (name, expiryDate, description, imageUri, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO items (name, expiryDate, description, imageUri) VALUES (?, ?, ?, ?);",
      [name, expiryDate, description, imageUri],
      (_, result) => callback(true),
      (_, error) => {
        console.log("Error inserting item:", error);
        callback(false);
      }
    );
  });
};

const fetchItems = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM items;",
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => {
        console.log("Error fetching items:", error);
        callback([]);
      }
    );
  });
};

const deleteItem = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM items WHERE id = ?;",
      [id],
      (_, result) => callback(true),
      (_, error) => {
        console.log("Error deleting item:", error);
        callback(false);
      }
    );
  });
};

const updateItem = (id, name, expiryDate, description, imageUri, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE items SET name = ?, expiryDate = ?, description = ?, imageUri = ? WHERE id = ?;",
      [name, expiryDate, description, imageUri, id],
      (_, result) => callback(true),
      (_, error) => {
        console.log("Error updating item:", error);
        callback(false);
      }
    );
  });
};

export { initDB, insertItem, fetchItems, deleteItem, updateItem };
