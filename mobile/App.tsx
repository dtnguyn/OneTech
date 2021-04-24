import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import CustomText from "./components/util/CustomText";
import { AuthContext } from "./context/AuthContext";
import { useMeQuery, User } from "./generated/graphql";
import AccountScreen from "./screens/AccountScreen/AccountScreen";
import AuthScreen from "./screens/AuthScreen";
import ComposeScreen from "./screens/ComposeScreen";
import DetailScreen from "./screens/DetailScreen/DetailScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SolutionScreen from "./screens/SolutionScreen";
import WebScreen from "./screens/WebScreen";
import { RootStackParamList } from "./utils/types";
import SplashScreen from "react-native-splash-screen";

import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import { CustomDarkTheme } from "./utils/themes";
import { getStringData, storeStringData } from "./utils/storageHelper";
import { ThemeContext } from "./context/ThemeContext";
import { createUploadLink } from "apollo-upload-client";
import CookieManager from "@react-native-cookies/cookies";

const { manifest } = Constants;

const uploadLink = createUploadLink({
  uri: `https://api.onetech.guru/graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  // uri: `http://${manifest.debuggerHost.split(":").shift()}:4000/graphql`,
  link: uploadLink as any,
  cache: new InMemoryCache({}),
  credentials: "include",
});
const RootStack = createStackNavigator<RootStackParamList>();
// const prefix = Linking.createURL("/");

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

LogBox.ignoreLogs(["Cache data may be lost"]);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState("light");

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
    fetchPolicy: "cache-and-network",
  });

  CookieManager.get("https://onetech.guru").then((cookies) => {
    console.log("CookieManager.get =>", cookies);
  });

  useEffect(() => {
    const users = data?.me?.data as User[];
    if (users && users.length != 0) {
      setUser(users[0]);
    } else {
      setUser(null);
    }
  }, [data]);

  useEffect(() => {
    getStringData("theme", (result, error) => {
      if (!error) {
        setTheme(result ? result : "light");
      } else {
        alert(error);
      }
    });
  }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, setUser }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <NavigationContainer
            theme={theme === "light" ? DefaultTheme : DarkTheme}
          >
            <RootStack.Navigator
              initialRouteName="Home"
              mode="modal"
              screenOptions={{
                headerTitleAlign: "center",
                animationEnabled: false,
              }}
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
                    elevation: 0,
                    backgroundColor: theme === "light" ? "#A8D8AD" : "#336B39",
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
                options={({ route, navigation }) => ({
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme === "light" ? "#A8D8AD" : "#336B39",
                  },
                  headerTitle: () => (
                    <CustomText fontSize={20} fontFamily="MSemiBold">
                      {(route?.params?.header as string)
                        ? route.params.header
                        : "Compose"}
                    </CustomText>
                  ),
                  headerLeft: () => null,
                })}
              />

              <RootStack.Screen
                name="Solution"
                component={SolutionScreen}
                options={({ route }) => ({
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme === "light" ? "#A8D8AD" : "#336B39",
                  },
                  headerTitle: () => (
                    <CustomText fontSize={20} fontFamily="MSemiBold">
                      Solutions
                    </CustomText>
                  ),
                })}
              />

              <RootStack.Screen
                name="Account"
                component={AccountScreen}
                options={({ route }) => ({
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme === "light" ? "#A8D8AD" : "#336B39",
                  },

                  headerTitle: () => (
                    <CustomText fontSize={20} fontFamily="MSemiBold">
                      Account
                    </CustomText>
                  ),
                })}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
