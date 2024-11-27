/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home"; // Make sure the path matches your file structure
import CameraComponent from "./components/CameraComponent";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import RecipeView from "./components/RecipeView";
import { initDB } from "./database/database";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDB();
    (async () => {
      const settings = await Notifications.getPermissionsAsync();
      if (!settings.granted) {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="Camera" component={CameraComponent} />
        <Stack.Screen name="ItemForm" component={ItemForm} />
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="RecipeView" component={RecipeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
