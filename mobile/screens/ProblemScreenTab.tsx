import { useFonts } from "expo-font";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import ProblemItem from "../components/deviceDetail/ProblemItem";

interface Props {}

const ProblemScreenTab: React.FC<Props> = ({}) => {
  const [fontsLoaded] = useFonts({
    MMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Find problems..."
          onChangeText={(text) => {}}
        />
        <Image
          source={require("../assets/images/search.png")}
          style={styles.searchIcon}
        />
      </View>
      <ProblemItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  textInputContainer: {
    marginTop: 20,
    width: "90%",
  },
  textInput: {
    fontFamily: "MMedium",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 5,
    paddingEnd: 40,
    marginBottom: 20,
  },
  searchIcon: {
    position: "absolute",
    right: 5,
    top: 8,
    width: 32,
    height: 32,
  },
});

export default ProblemScreenTab;
