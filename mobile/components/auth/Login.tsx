import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../util/CustomText";
import AuthButton from "./AuthButton";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";

import * as WebBrowser from "expo-web-browser";
import { ScreenNavigationProp } from "../../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { manifest } = Constants;

  Linking.addEventListener("url", async (event) => {
    // console.log(event);
    // WebBrowser.maybeCompleteAuthSession("success");
  });

  return (
    <View style={styles.container}>
      <CustomText fontSize={22} fontFamily="MSemiBold" style={styles.authTitle}>
        Log in
      </CustomText>
      <AuthButton
        title="Log in with Google"
        icon={require("../../assets/images/google.png")}
        onPress={() => {
          // Linking.openURL(
          //   `http://${manifest.debuggerHost
          //     .split(":")
          //     .shift()}:4000/auth/login?method=google&from=mobile`
          // );
          // Linking.openURL(
          //   `https://api.onetech.guru/auth/login?method=google&from=mobile`
          // );
          // const result = await WebBrowser.openAuthSessionAsync(
          //   `https://api.onetech.guru/auth/login?method=google&from=${Linking.createURL(
          //     "/"
          //   )}`,
          //   Linking.createURL("/")
          // );
          // await AuthSession.startAsync({
          // authUrl: `https://api.onetech.guru/auth/login?method=google&from=${Linking.createURL(
          //   "/"
          // )}`,
          // });
          navigation.push("Web");
        }}
      />
      <AuthButton
        title="Log in with Facebook"
        icon={require("../../assets/images/facebook.png")}
        onPress={() => {}}
      />

      <AuthButton
        title="Log in with Twitter"
        icon={require("../../assets/images/twitter.png")}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  authTitle: {
    marginVertical: 10,
    alignSelf: "center",
  },
});

export default Login;
