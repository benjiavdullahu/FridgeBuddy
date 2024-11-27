/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Food Storage App!</Text>
      <Button
        title="View Items"
        onPress={() => navigation.navigate("ItemList")}
      />
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate("Camera")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Home;
