import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../util/CustomText";
import AuthButton from "./AuthButton";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import axios from "axios";

import * as WebBrowser from "expo-web-browser";
import { ScreenNavigationProp } from "../../utils/types";
import { getStringData } from "../../utils/storageHelper";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

interface Props {
  navigation: ScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { manifest } = Constants;

  // Linking.addEventListener("url", async (event) => {
  //   console.log("hello");
  //   WebBrowser.dismissBrowser;
  // });

  const openLink = async () => {
    try {
      const url = `https://api.onetech.guru/auth/login?method=google&from=${Linking.createURL(
        "/"
      )}`;
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.openAuth(url, Linking.createURL("/"), {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then((response) => {
          if (response.type === "success" && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else Linking.openURL(url);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText fontSize={22} fontFamily="MSemiBold" style={styles.authTitle}>
        Log in
      </CustomText>
      <AuthButton
        title="Log in with Google"
        icon={require("../../assets/images/google.png")}
        onPress={async () => {
          // axios
          //   .get(
          //     `https://api.onetech.guru/auth/login?method=google&from=${Linking.createURL(
          //       "/"
          //     )}`
          //   )
          //   .then((response) => {
          //     console.log(response);
          //   });
          // Linking.openURL(
          //   `http://${manifest.debuggerHost
          //     .split(":")
          //     .shift()}:4000/auth/login?method=google&from=mobile`
          // );
          // Linking.openURL(
          // `https://api.onetech.guru/auth/login?method=google&from=${Linking.createURL(
          //   "/"
          // )}`
          // );
          // const result = await WebBrowser.openAuthSessionAsync(
          //   `https://onetech.guru`,
          //   Linking.createURL("/")
          // );
          // const url = AuthSession.makeRedirectUri({
          //   native: Linking.createURL("/"),
          // });
          // await AuthSession.startAsync({
          //   authUrl: `https://api.onetech.guru/auth/login?method=google&redirect=https://onetech.guru/redirect/auth/login/mobile/success&failureRedirect=https://onetech.guru/redirect/auth/login/mobile/error`,
          //   returnUrl: url,
          // }).catch((error) => {
          //   console.log(error.message);
          // });
          // console.log(
          //   AuthSession.makeRedirectUri({
          //     native: "authredirect://",
          //   })
          // );
          // try {
          //   let authResult = await WebBrowser.openAuthSessionAsync(
          //     `https://api.onetech.guru/auth/login?method=google&redirect=https://onetech.guru/redirect/auth/login/mobile/success&failureRedirect=https://onetech.guru/redirect/auth/login/mobile/error`,
          //     // "https://onetech.guru"
          //     Linking.createURL("/")
          //   );
          //   console.log(authResult);
          //   // await openLink();
          // } catch (err) {
          //   console.log("ERROR:", err);
          // }
          navigation.push("Web", {
            type: "login",
            url: `https://api.onetech.guru/auth/login?method=google&redirect=https://onetech.guru/redirect/auth/login/mobile/success&failureRedirect=https://onetech.guru/redirect/auth/login/mobile/error`,
          });
        }}
      />
      <AuthButton
        title="Log in with Facebook"
        icon={require("../../assets/images/facebook.png")}
        onPress={() => {
          navigation.push("Web", {
            type: "login",
            url: `https://api.onetech.guru/auth/login?method=facebook&redirect=https://onetech.guru/redirect/auth/login/mobile/success&failureRedirect=https://onetech.guru/redirect/auth/login/mobile/error`,
          });
        }}
      />

      <AuthButton
        title="Log in with Twitter"
        icon={require("../../assets/images/twitter.png")}
        onPress={() => {
          navigation.push("Web", {
            type: "login",
            url: `https://api.onetech.guru/auth/login?method=twitter&redirect=https://onetech.guru/redirect/auth/login/mobile/success&failureRedirect=https://onetech.guru/redirect/auth/login/mobile/error`,
          });
        }}
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
