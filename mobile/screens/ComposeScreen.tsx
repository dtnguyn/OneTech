import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import WebView from "react-native-webview";
import CustomText from "../components/util/CustomText";
import * as Linking from "expo-linking";
import {
  ComposeRouteProp,
  RatingValue,
  ScreenNavigationProp,
} from "../utils/types";
import Slider from "@react-native-community/slider";
import { ReviewRating } from "../generated/graphql";
import { laptopSpec, mobileSpec, pcSpec } from "../utils/specArr";

interface Props {
  navigation: ScreenNavigationProp;
  route: ComposeRouteProp;
}

const ComposeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [compose, setCompose] = useState({
    title: route.params.title,
    content: route.params.content,
  });

  const [rating, setRating] = useState(route.params.rating);
  const [specsArr, setSpecsArr] = useState<Array<string>>([]);
  const [overallRating, setOverallRating] = useState(0);

  const calculateOverall = () => {};

  useEffect(() => {
    if (!rating) return;
    switch (route.params.category) {
      case "phone":
        setSpecsArr(mobileSpec);
        break;
      case "laptop":
        setSpecsArr(laptopSpec);
        break;
      case "pc":
        setSpecsArr(pcSpec);
        break;
    }
  }, []);

  useEffect(() => {
    let sum = 0;
    for (const spec of specsArr) {
      if ((rating as any)[spec.toLowerCase()] === 0) {
        sum = 0;
        break;
      } else {
        sum += (rating as any)[spec.toLowerCase()];
      }
    }
    setOverallRating(sum === 0 ? sum : sum / specsArr.length);
  }, [rating]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomText style={styles.label}>Title</CustomText>
        <TextInput
          style={styles.titleInput}
          value={compose?.title}
          onChangeText={(text) => setCompose({ ...compose, title: text })}
        />

        {rating ? (
          <View style={styles.ratingContainer}>
            <CustomText style={styles.label}>{`Rating (${overallRating.toFixed(
              1
            )})`}</CustomText>
            {specsArr.map((spec) => (
              <View style={{ width: "90%", alignItems: "center" }} key={spec}>
                <CustomText fontFamily="MRegular">{`${spec} (${(rating as any)[
                  spec.toLowerCase()
                ].toFixed(1)})`}</CustomText>
                <Slider
                  style={{ width: "100%", height: 40 }}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.1}
                  value={(route.params.rating as any)[spec.toLowerCase()]}
                  onValueChange={(value) => {
                    setRating({ ...rating, [spec.toLowerCase()]: value });
                  }}
                  minimumTrackTintColor="#52AF77"
                  maximumTrackTintColor="#2E563F"
                />
              </View>
            ))}
          </View>
        ) : null}

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
          disabled={
            (rating && overallRating === 0) ||
            !compose.title ||
            !compose.content
          }
          onPress={() => {
            const finalRating = rating;
            (finalRating as any).overall = overallRating;
            route.params.onCompose(compose.title, compose.content, rating, []);
            navigation.pop();
          }}
        >
          <CustomText style={{ color: "#fff" }}>Submit</CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
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
  ratingContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
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
