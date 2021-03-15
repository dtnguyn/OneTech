import moment from "moment";
import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import HTML from "react-native-render-html";
import { Review } from "../../generated/graphql";
import CustomText from "../util/CustomText";

interface Props {
  review: Review;
}

const ReviewItem: React.FC<Props> = ({ review }) => {
  console.log(review.rating);
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
        <View style={styles.ratingButton}>
          <CustomText>{review.rating.overall?.toFixed(1)}</CustomText>
        </View>
      </View>
      <HTML
        source={{ html: review.content }}
        contentWidth={50}
        baseFontStyle={{ fontFamily: "MMedium" }}
        computeEmbeddedMaxWidth={(width) => 300}
      />
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
  ratingButton: {
    width: 53,
    height: 53,
    borderRadius: 53,
    marginStart: "auto",
    backgroundColor: "#A8D8AD",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewButton: {
    width: 53,
    height: 53,
    borderRadius: 53,
    backgroundColor: "#C4C4C4",
  },
});

export default ReviewItem;
