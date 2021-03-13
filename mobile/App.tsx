import React, { useEffect, useState } from "react";
import {
  Button,
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  View,
  YellowBox,
} from "react-native";
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
import { useFonts } from "expo-font";
import CustomText from "./components/util/CustomText";
import ComposeScreen from "./screens/ComposeScreen";
const { manifest } = Constants;

const client = new ApolloClient({
  // uri: `http://${manifest.debuggerHost.split(":").shift()}:4000/graphql`,
  uri: `https://api.onetech.guru/graphql`,
  cache: new InMemoryCache(),
});
const RootStack = createStackNavigator<RootStackParamList>();
// const prefix = Linking.createURL("/");

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const [fontsLoaded] = useFonts({
    MLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

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

  if (!fontsLoaded) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="Home"
            mode="modal"
            screenOptions={{ headerTitleAlign: "center" }}
          >
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
              options={({ route }) => ({
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#A8D8AD",
                },

                headerTitle: () => (
                  <CustomText fontSize={20} fontFamily="MSemiBold">
                    {(route?.params?.name as string)
                      ? route.params.name
                      : "Detail"}
                  </CustomText>
                ),
              })}
            />

            <RootStack.Screen
              name="Compose"
              component={ComposeScreen}
              options={({ route }) => ({
                headerShown: true,

                headerTitle: () => (
                  <CustomText fontSize={20} fontFamily="MSemiBold">
                    {(route?.params?.header as string)
                      ? route.params.header
                      : "Compose"}
                  </CustomText>
                ),
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
