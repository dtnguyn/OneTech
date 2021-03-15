import React, { useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ReviewItem from "../components/deviceDetail/ReviewItem";
import { useReviews } from "../context/ReviewContext";
import { Review } from "../generated/graphql";

interface Props {
  submitSearchValue: (text: string) => void;
}

const ReviewScreenTab: React.FC<Props> = ({ submitSearchValue }) => {
  const { reviews } = useReviews();
  const [currentView, setCurrentView] = useState("review");

  const renderReviewItem: ListRenderItem<Review> = ({ item }) => {
    return <ReviewItem review={item} />;
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
        style={{
          paddingHorizontal: 15,
        }}
        data={reviews}
        renderItem={renderReviewItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
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
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ReviewScreenTab;
