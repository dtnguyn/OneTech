import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, AppState, StatusBar } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../components/auth/AuthButton";
import CustomSwitch from "../components/auth/CustomSwitch";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import CustomText from "../components/util/CustomText";
import { useMeQuery } from "../generated/graphql";
import { ScreenNavigationProp } from "../utils/types";
import { useTheme } from "../context/ThemeContext";

interface Props {
  navigation: ScreenNavigationProp;
}

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const [currentOption, setCurrentOption] = useState("Log in");
  const { theme } = useTheme();
  const { data, error } = useMeQuery({
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    console.log(data);
    if (data?.me?.status) {
      navigation.pop();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity
          style={styles.homeIconContainer}
          onPress={() => navigation.pop()}
        >
          <Image
            source={require(`../assets/images/home.png`)}
            style={styles.homeIcon}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.authContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require(`../assets/images/logo.png`)}
                style={styles.logo}
              />
              <CustomText fontFamily="MRegular" fontSize={34}>
                OneTech
              </CustomText>
            </View>
            <CustomSwitch
              optionWidth={100}
              options={["Log in", "Sign up"]}
              currentOption={currentOption}
              changeOption={(option) => setCurrentOption(option)}
            />
            {currentOption === "Log in" ? (
              <Login navigation={navigation} />
            ) : (
              <Register navigation={navigation} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    display: "flex",
    marginBottom: 30,
    marginTop: -30,
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: "80%",
    display: "flex",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginEnd: 10,
    marginBottom: 15,
  },
  logo: {
    width: 100,
    height: 100,
  },
  authTitle: {
    marginVertical: 10,
    alignSelf: "center",
  },
  homeIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 53,
    height: 53,
    elevation: 4,
    backgroundColor: "#EFEFEF",
    borderRadius: 53,
    marginTop: 15,
    marginStart: "auto",
    marginEnd: 10,
  },
  homeIcon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
});

export default AuthScreen;
