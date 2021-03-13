import { useFonts } from "expo-font";
import React, { useState } from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import WebView from "react-native-webview";
import CustomText from "../components/util/CustomText";
import * as Linking from "expo-linking";
import { ComposeRouteProp, ScreenNavigationProp } from "../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
  route: ComposeRouteProp;
}

const ComposeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [compose, setCompose] = useState({
    title: "",
    content: "",
  });

  const [fontsLoaded] = useFonts({
    MMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomText style={styles.label}>Title</CustomText>
        <TextInput
          style={styles.titleInput}
          value={compose?.title}
          onChangeText={(text) => setCompose({ ...compose, title: text })}
        />
        <CustomText style={styles.label}>Content</CustomText>
        <TextInput
          style={styles.contentInput}
          multiline={true}
          value={compose?.content}
          textAlignVertical="top"
          onChangeText={(text) => setCompose({ ...compose, content: text })}
        />

        <TouchableOpacity
          containerStyle={styles.submitButton}
          onPress={() => {
            route.params.onCompose(compose.title, compose.content, []);
            navigation.pop();
          }}
        >
          <CustomText style={{ color: "#fff" }}>Add</CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    marginStart: 30,
    alignSelf: "flex-start",
  },
  titleInput: {
    marginBottom: 20,
    width: "90%",
    height: 50,
    fontFamily: "MMedium",
    borderColor: "gray",
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 5,
  },
  contentInput: {
    marginBottom: 20,
    width: "90%",

    height: 500,
    fontFamily: "MMedium",
    borderColor: "gray",
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    width: "90%",
    borderRadius: 15,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#017BFE",
  },
});

export default ComposeScreen;
