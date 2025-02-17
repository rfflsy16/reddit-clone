import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/AddPostScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from "./screens/RegisterScreen";
import isSignOut from "./hooks/isSignOut";
import isSignIn from "./hooks/isSignIn";
import Profile from "./screens/ProfileScreen";
import addPost from "./screens/AddPostScreen";
import MainTab from "./screens/MainTab";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }} />
        <Stack.Screen name="MainTab" component={MainTab} options={{ title: "Home" }} />

        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} /> */}
        <Stack.Screen name="AddPost" component={addPost} options={{ title: "Add Post" }} />
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Reddit" }} />
        <Stack.Screen name="Post" component={PostScreen} options={{ title: "Post" }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}