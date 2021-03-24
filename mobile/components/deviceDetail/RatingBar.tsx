import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../util/CustomText";

interface Props {
  rating: number;
}

const RatingBar: React.FC<Props> = ({ rating }) => {
  const handleRatingBarColor = (number: number) => {
    if (number > 80) {
      return "#9bc72b";
    } else if (number > 60) {
      return "#a8d8ad";
    } else if (number > 40) {
      return "#f3e70a";
    } else if (number > 20) {
      return "#c65151";
    } else {
      return "#ca241c";
    }
  };

  if (!rating) return <CustomText>not rating yet</CustomText>;

  return (
    <View
      style={{
        ...styles.container,
        width: `${rating * 10}%`,
        backgroundColor: handleRatingBarColor(rating * 10),
      }}
    >
      <CustomText fontSize={10} style={{ color: "#000" }}>
        {rating.toFixed(1)}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
});

export default RatingBar;
