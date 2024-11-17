import React from "react";
import { AppNavigation } from "./AppNavigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from "./config/apolloClient-config";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  );
}
