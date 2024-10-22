import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView,  Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Recipes = ({ meal }) => {
  const navigation = useNavigation();
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.cont}
      onPress={() => navigation.navigate("RecipeDetails", {item : meal})}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.thirdBtnActive} />
        <Text style={styles.txt}>
          {meal.strMeal.length > 20 ? meal.strMeal.slice(0, 20) + '...' : meal.strMeal}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    
  },
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp(2), 
  },
  thirdBtnActive: {
    width: '100%',
    height: hp(35),
    borderRadius: 20,
    marginBottom: wp(3),
    marginTop: hp(6),
  },

  txt: {
    fontSize: hp(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Recipes;
