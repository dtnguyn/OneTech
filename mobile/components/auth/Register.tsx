import { useFonts } from "expo-font";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ScreenNavigationProp } from "../../utils/types";
import CustomText from "../util/CustomText";
import AuthButton from "./AuthButton";

interface Props {
  navigation: ScreenNavigationProp;
}

const Register: React.FC<Props> = ({ navigation }) => {
  const [registerEmail, setRegisterEmail] = useState("");

  const checkEmail = (email: string) => {
    if (!email) return false;
    if (!email.includes("@")) return false;
    console.log(email.includes("."));
    return true;
  };

  return (
    <View style={styles.container}>
      <CustomText fontSize={22} fontFamily="MSemiBold" style={styles.authTitle}>
        Wanna sign up? Easy!!
      </CustomText>
      <CustomText style={styles.authStep}>
        Step 1: Tell us your email
      </CustomText>
      <TextInput
        style={styles.textInputContainer}
        placeholder="enter your email..."
        onChangeText={(text) => {
          setRegisterEmail(text);
        }}
      />
      <CustomText style={styles.authStep}>
        Step 2: Choose your preferred login method
      </CustomText>
      <AuthButton
        title="Sign up with Google"
        icon={require("../../assets/images/google.png")}
        onPress={() => {
          if (!checkEmail(registerEmail)) {
            alert("Please enter a valid email");
            return;
          }
          navigation.push("Web", {
            type: "register",
            url: `https://api.onetech.guru/auth/register?method=google&email=${registerEmail}&redirect=https://onetech.guru/redirect/auth/register/mobile/success&failureRedirect=https://onetech.guru/redirect/auth/register/mobile/error`,
          });
        }}
      />
      <AuthButton
        title="Sign up with Facebook"
        icon={require("../../assets/images/facebook.png")}
        onPress={() => {
          if (!checkEmail(registerEmail)) {
            alert("Please enter a valid email");
            return;
          }
          navigation.push("Web", {
            type: "register",
            url: `https://api.onetech.guru/auth/register?method=facebook&email=${registerEmail}`,
          });
        }}
      />
      <AuthButton
        title="Sign up with Twitter"
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
  authStep: {
    marginVertical: 15,
    alignSelf: "center",
    textAlign: "center",
    color: "#A4A2A2",
  },
  textInputContainer: {
    marginVertical: 10,
    width: "100%",
    height: 55,
    backgroundColor: "#E0E0E0",
    fontFamily: "MMedium",
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Register;
