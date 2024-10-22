import { ScrollView, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Categories = ({ categories, setActiveCategory, onSelectCategory }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat, index) => {
          
          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => {
                setActiveCategory(cat.strCategory); 
                onSelectCategory(cat.strCategory); 
              }}
            >
              <View style={styles.imgWrapper}>
                <View style={styles.activeButton}>
                  <Image source={{ uri: cat.strCategoryThumb }} style={styles.image} />
                </View>
                <Text style={styles.categoryText}>{cat.strCategory}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Text style={styles.textrecipe}>Popular Recipes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 
  activeButton: {
    marginHorizontal: wp(3),
    height: hp(9),
    width: hp(9),
    borderRadius: 50,
    backgroundColor: 'rgba(128, 128, 128, 0.2)', 
    justifyContent: "center",
    alignItems: "center",
  },
  imgWrapper: {
    alignItems: "center",
    marginVertical: hp(1),
    paddingTop: hp(4),
  },
  image: {
    width: hp(8),
    height: hp(8),
    borderRadius: 40,
  },
  categoryText: {
    marginTop: hp(1),
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  textrecipe: {
    fontSize: hp(3),
    fontWeight: "700",
    paddingLeft: hp(3),
    paddingTop: hp(3),
    marginBottom: hp(-1),
    flex: 1,
  },
});

export default Categories;
