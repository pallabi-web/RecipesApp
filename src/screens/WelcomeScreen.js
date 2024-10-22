import { StyleSheet, Image, View, Text } from 'react-native';
import React, {useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    try{
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000); 

    return () => clearTimeout(timer); 
  } catch (error) {
    console.error('Error in navigation:', error);
  }
}, [])

 
  return (
    <View style={styles.container}>
     
     <Image source={require("../../assets/dish.webp")} 
     style={{width: hp(30), height: hp(30) }}/>
     <Text style={styles.text}> Food Mania </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: hp(3.6),
    fontWeight: 'bold',

  },

 
});
export default WelcomeScreen;