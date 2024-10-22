import React, { useEffect, useState } from "react";
import { Text, ScrollView, Image, StyleSheet, ActivityIndicator, View } from "react-native";
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RecipeDetailScreen = ({ route }) => {
  const { item } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (item && item.idMeal) {
      console.log('Item ID:', item.idMeal); 
      fetchmealdata(item.idMeal);
    } else {
      console.error('Invalid item:', item);
    }
  }, [item]);

  const fetchmealdata = async (idMeal) => {
    console.log('Fetching data for ID:', idMeal); 
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      if (response.data && response.data.meals) {
        console.log('Fetched meal data:', response.data.meals);
        setMeals(response.data.meals);
      } else {
        console.error('Invalid response:', response.data); 
      }
    } catch (error) {
      console.error('Error fetching meal data:', error.message);
    }
    finally{
      setLoading(false);
    }
  };


  const ingredients = (meal) =>{
    if(!meal) return [];
    let indexes = [];
    for(let i=1; i<=20; i++){
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  }



return (
  <ScrollView style={styles.cont}>
    <View style={styles.vw}>
      <Image source={{ uri: item.strMealThumb }} style={styles.img} />
      {loading ? (
        <ActivityIndicator size="large" color="orange" style={styles.loadingIndicator} />
      ) : (
        <>
          {meals.map((meal, index) => (
            <View key={index}>
              <Text style={styles.txt}>{meal.strMeal}</Text>
              <Text style={styles.txtarea}>{meal.strArea}</Text>
            </View>
          ))}
          <View>
            <Text style={styles.heading}>Ingredients</Text>
            {ingredients(meals[0]).map((i) => (
              <Text key={i} style={styles.ingre}>
                <Text style={styles.bullet}>• </Text>
                  {meals[0][`strMeasure${i}`]}  {meals[0][`strIngredient${i}`]}
              </Text>
            ))}
          </View>
          {meals.map((meal, index) => (
            <Text key={index} style={styles.inst}>{meal.strInstructions}</Text>
          ))}

        </>
      )}
    </View>
  </ScrollView>
);
}

  

const styles = StyleSheet.create({
    cont:{
        backgroundColor:"white",
    },
    vw:{
      flex:1,
    },
    txt:{
      fontSize:hp(4),
      fontWeight:"900",
      paddingTop:hp(3.7),
      left:hp(2),
      marginRight:hp(4),

  },
    txtarea:{
      fontSize:hp(2.4),
      left:hp(2),
      fontWeight:"700",
      paddingTop:hp(1),

    },
    heading:{
      left:hp(2),
      paddingBottom:hp(2),
      fontSize:hp(2.9),
      fontWeight:"bold",
      paddingTop:hp(3),

    },
    ingre:{
      left:hp(2),
      fontSize:hp(2.5),
      padding:hp(1),
      fontWeight:"600",
    },
    bullet:{
      color:"orange",
      fontWeight:"bold",
      fontSize:hp(2.4),

    },
    inst:{
      left:hp(2),
      width:"92%",
      fontSize:hp(2.4),
      fontWeight:"600",
      paddingTop:hp(3),
      paddingBottom:hp(3),

    },
    img:{
        width:wp(98),
        height:hp(50),
        margin:hp(0.4),
        borderBottomLeftRadius:60,
        borderBottomRightRadius:60,
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
      
    },
    loadingIndicator:{
      padding:hp(4),

    },
 

});

export default RecipeDetailScreen;
