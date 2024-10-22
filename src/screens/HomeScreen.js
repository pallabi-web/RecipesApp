import { FlatList, StyleSheet, Image, Text, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(''); 

  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
    getRandomRecipes();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error:", err.message);
    }
  };

  const getRandomRecipes = async () => {
    const recipes = [];
    try {
      for (let i = 0; i < 16; i++) {
        const response = await axios.get('https://themealdb.com/api/json/v1/1/random.php');
        if (response && response.data && response.data.meals) {
          recipes.push(response.data.meals[0]);
        }
      }
      console.log('Random Recipes:', recipes); // Log response
      setPopularRecipes(recipes);
    } catch (err) {
      console.log('Error fetching random recipes:', err.message);
    }
  };
  

  const handleSelectCategory = (category) => {
    setActiveCategory(category); 
    navigation.navigate('Recipes', { category }); 
  };

  const renderHeader = () => (
    <View style={styles.co}>
      <View style={styles.av}>
        <Image source={require("../../assets/avi.jpeg")} style={{ width: hp(4), height: hp(4) }} />
        <Image source={require("../../assets/bell.png")} style={{ width: hp(3.6), height: hp(3.6) }} />
      </View>
      <View style={styles.col}>
        <Text style={styles.text}>Hello, Pallabi !!</Text>
        <Text style={styles.txtfood}>Make your own food,</Text>
        <Text style={styles.txtfo}>stay at <Text style={{ color: "orange", fontWeight: "bold" }}>home</Text></Text>
      </View>

      <View style={styles.search}>
        <TextInput style={styles.searchtxt} placeholder='Search any recipe' />
        <Image source={require("../../assets/magnify.png")} style={{ width: hp(5.4), height: hp(5.4), marginTop: hp(1) }} />
      </View>

      <View>
        <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} onSelectCategory={handleSelectCategory}/>
      </View>
     
    
    </View>
  );

  return (
    <View style={styles.conm}>
      {
         <FlatList
      ListHeaderComponent={renderHeader}  
      data={popularRecipes} 
      keyExtractor={(item) => item.idMeal}
      numColumns={2} 
      renderItem={({ item, index }) => <Recipes meal={item} index={index} />}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
      }
      </View>
     
  );
};

const styles = StyleSheet.create({
  co:{
    top:hp(2.8),

  },
  conm:{
    backgroundColor:"white",
    flex:1,
  },
  container: {
    paddingBottom: hp(5),
    paddingTop:hp(3), 
    backgroundColor:"white",
  },
  av: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: hp(2.5),
  },
  text: {
    fontSize: hp(3),
  },
  loadingIndicator: {
    marginTop: hp(50),
  },
  txtfood: {
    fontSize: hp(4.5),
    fontWeight: "bold",
    marginTop: hp(2),
  },
  txtfo: {
    fontSize: hp(4.5),
    fontWeight: 'bold',
  },
  col: {
    marginLeft: hp(3),
    marginTop: hp(3),
  },
  search: {
    borderWidth: 1,
    marginTop: hp(3),
    borderRadius: 50,
    marginLeft: hp(1.6),
    marginRight: hp(1.6),
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: hp(2.5),
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
  },
  searchtxt: {
    fontSize: hp(2.6),
    padding: hp(1.6),
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
});

export default HomeScreen;
