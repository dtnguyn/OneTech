import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SearchScreen from "./screens/SearchScreen";
import { RootStackParamList } from "./utils/types";
import AuthScreen from "./screens/AuthScreen";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import WebScreen from "./screens/WebScreen";
import { AuthContext } from "./context/AuthContext";
import { useMeQuery, User } from "./generated/graphql";
import DetailScreen from "./screens/DetailScreen";

const { manifest } = Constants;

const client = new ApolloClient({
  // uri: `http://${manifest.debuggerHost.split(":").shift()}:4000/graphql`,
  uri: `https://api.onetech.guru/graphql`,
  cache: new InMemoryCache(),
});
const RootStack = createStackNavigator<RootStackParamList>();
// const prefix = Linking.createURL("/");

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useMeQuery({
    variables: {},
    client: client,
  });

  useEffect(() => {
    const users = data?.me?.data as User[];
    if (users && users.length != 0) {
      setUser(users[0]);
    } else {
      setUser(null);
    }
  }, [data]);
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Home" mode="modal">
            <RootStack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />

            <RootStack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />

            <RootStack.Screen
              name="Web"
              component={WebScreen}
              options={{ headerShown: false }}
            />

            <RootStack.Screen
              name="Detail"
              component={DetailScreen}
              // options={{
              //   headerShown: true,
              //   headerStyle: { backgroundColor: "#A8D8AD" },
              // }}
              options={({ route }) => ({
                title: (route?.params?.name as string)
                  ? route.params.name
                  : "Detail",
              })}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
