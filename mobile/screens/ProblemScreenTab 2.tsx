import { useFonts } from "expo-font";
import React from "react";
import {
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProblemItem from "../components/deviceDetail/ProblemItem";
import { DeviceProblem } from "../generated/graphql";

interface Props {
  problems: Array<DeviceProblem>;
  submitSearchValue: (text: string) => void;
}

const ProblemScreenTab: React.FC<Props> = ({ problems, submitSearchValue }) => {
  const [fontsLoaded] = useFonts({
    MMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  const renderProblemItem: ListRenderItem<DeviceProblem> = ({ item }) => {
    return <ProblemItem problem={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Find problems..."
          onChangeText={(text) => {
            submitSearchValue(text);
          }}
        />
        <Image
          source={require("../assets/images/search.png")}
          style={styles.searchIcon}
        />
      </View>
      <FlatList
        data={problems}
        renderItem={renderProblemItem}
        keyExtractor={(item) => item.id}
      />
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
