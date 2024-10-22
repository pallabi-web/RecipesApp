import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import RecipeMeals from "../screens/RecipeMeals";

const Stack = createStackNavigator();
const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions ={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} ></Stack.Screen>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Recipes" component={RecipeMeals}></Stack.Screen>
            <Stack.Screen name="RecipeDetails" component={RecipeDetailScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );

};
export default AppNavigator;
