/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";
import { fetchRecipes } from "../api/recipes";

const RecipeView = ({ route }) => {
  const { ingredient } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchRecipes(ingredient, setRecipes);
  }, [ingredient]);

  const recipesPerPage = 5;
  const maxPage = Math.ceil(recipes.length / recipesPerPage) - 1;

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes.slice(page * recipesPerPage, (page + 1) * recipesPerPage)}
        keyExtractor={(recipe, index) => recipe.idMeal.toString() + index}
        renderItem={({ item }) => (
          <View style={styles.recipe}>
            {item.strMealThumb && (
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            )}
            <Text style={styles.title}>{item.strMeal}</Text>
            <Text style={styles.subtitle}>Instructions:</Text>
            <Text style={styles.instructions}>{item.strInstructions}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Button
          title="Prev"
          onPress={() => setPage(Math.max(page - 1, 0))}
          disabled={page === 0}
        />
        <Button
          title="Next"
          onPress={() => setPage(Math.min(page + 1, maxPage))}
          disabled={page === maxPage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  recipe: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  instructions: {
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});

export default RecipeView;
