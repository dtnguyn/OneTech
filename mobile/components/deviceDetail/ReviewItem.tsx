import moment from "moment";
import React, { useState } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import { Review } from "../../generated/graphql";
import CustomText from "../util/CustomText";
import SpecTable from "./SpecTable";

interface Props {
  category: string;
  review: Review;
}

const ReviewItem: React.FC<Props> = ({ review, category }) => {
  const [currentView, setCurrentView] = useState("review");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.userIcon} source={{ uri: review.author.avatar }} />
        <View style={{ marginStart: 10 }}>
          <CustomText fontFamily="MSemiBold" fontSize={18}>
            {review.author.username}
          </CustomText>
          <CustomText fontFamily="MLight">
            {moment(review.createdAt).format("LL")}
          </CustomText>
        </View>

        {currentView === "review" ? (
          <View style={styles.ratingButtonContainer}>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => setCurrentView("rating")}
            >
              <CustomText>{review.rating.overall?.toFixed(1)}</CustomText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.reviewButtonContainer}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => setCurrentView("review")}
            >
              <Image
                style={styles.reviewIcon}
                source={require("../../assets/images/review.png")}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {currentView === "review" ? (
        <HTML
          source={{ html: review.content }}
          contentWidth={50}
          baseFontStyle={{ fontFamily: "MMedium" }}
          computeEmbeddedMaxWidth={(width) => 300}
        />
      ) : (
        <SpecTable
          currentOption="Rating"
          rating={review.rating}
          spec={null}
          category={category}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    width: 53,
    height: 53,
    borderRadius: 53,
    backgroundColor: "#C4C4C4",
  },
  ratingButtonContainer: {
    width: 53,
    height: 53,
    borderRadius: 53,
    backgroundColor: "#A8D8AD",

    marginStart: "auto",
    marginEnd: 5,
    elevation: 4,
  },
  ratingButton: {
    width: 53,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewButtonContainer: {
    width: 53,
    height: 53,
    borderRadius: 53,
    backgroundColor: "#C4C4C4",

    marginStart: "auto",
    marginEnd: 5,
    elevation: 4,
  },
  reviewButton: {
    width: 53,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewIcon: {
    width: 28,
    height: 28,
  },
});

export default ReviewItem;
