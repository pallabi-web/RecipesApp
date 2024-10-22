import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const RecipeMeals = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params; 
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        if (response.data && response.data.meals) {
          setRecipes(response.data.meals);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchRecipes();
  }, [category]);

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeItem}>

      <TouchableOpacity style={styles.cont}
      onPress={() => navigation.navigate("RecipeDetails", {item})}>
      <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>
      {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
     </Text> 
     </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="orange" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}  
          renderItem={renderRecipeItem}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.conr}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
   categoryText: {
    marginTop: hp(1),
    fontSize: hp(2),
    fontWeight: 'bold',
  },
 
  conr: {
    paddingBottom: hp(5),
    paddingTop:hp(3), 
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  loadingIndicator: {
    marginTop: hp(50),
  },
  listContainer: {
    paddingBottom: hp(5),
  },
  recipeItem: {
    flex:1,
  },
  cont: {
    width:wp(40),
    alignItems:"center",
    justifyContent:"center",
    marginLeft:hp(1.6),
    marginTop:hp(2),

  },
  recipeImage: {
    width: '105%',
    height: hp(36),
    borderRadius: 20,
    marginBottom: wp(3),
    marginTop: hp(1),
  },
  recipeName: {
    fontSize: hp(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RecipeMeals;
