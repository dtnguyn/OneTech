import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomText from "../util/CustomText";
import AuthButton from "./AuthButton";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const [fontsLoaded] = useFonts({
    MMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

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
        onChangeText={(text) => {}}
      />
      <CustomText style={styles.authStep}>
        Step 2: Choose your preferred login method
      </CustomText>
      <AuthButton
        title="Log in with Google"
        icon={require("../../assets/images/google.png")}
        onPress={() => {}}
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
  authStep: {
    marginVertical: 15,
    alignSelf: "center",
    textAlign: "center",
    color: "#A4A2A2",
  },
  textInputContainer: {
    margin: 10,
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
