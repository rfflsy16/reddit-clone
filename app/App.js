import React, { useState } from "react";
import { AppNavigation } from "./AppNavigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from "./config/apolloClient-config";
import { LoginContext } from "./contexts/LoginContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from "./screens/RegisterScreen";
import isSignOut from "./hooks/isSignOut";
import isSignIn from "./hooks/isSignIn";
import { createStaticNavigation } from "@react-navigation/native";
import { useApolloClientDevTools } from '@dev-plugins/apollo-client';

const StackNavigator = createNativeStackNavigator({
  screens: {
    LoginScreen: {
      if: isSignOut,
      screen: LoginScreen
    },
    HomeScreen: {
      if: isSignIn,
      screen: HomeScreen
    }
  }
})

const Navigation = createStaticNavigation(StackNavigator)

export default function App() {
  useApolloClientDevTools(client);
  const [isLogin, setIsLogin] = useState(false)
  return (
    <ApolloProvider client={client}>
      <LoginContext.Provider value={{
        isLogin,
        setIsLogin
      }} />
      <AppNavigation />
    </ApolloProvider>
  );
}
