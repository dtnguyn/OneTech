import moment from "moment";
import React, { useState } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Review } from "../../generated/graphql";
import CustomText from "../util/CustomText";
import SpecTable from "./SpecTable";

interface Props {
  category: string;
  review: Review;
  deletePost: (review: Review, images: string[]) => void;
  updatePost: (review: Review) => void;
  reportPost: (review: Review) => void;
}

const ReviewItem: React.FC<Props> = ({
  review,
  category,
  deletePost,
  updatePost,
  reportPost,
}) => {
  const [currentView, setCurrentView] = useState("review");
  const { user } = useAuth();
  const { theme } = useTheme();

  const handleRatingButtonColor = (number: number) => {
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
          <View
            style={{
              ...styles.ratingButtonContainer,
              backgroundColor: handleRatingButtonColor(
                review.rating.overall ? review.rating.overall * 10 : 0
              ),
            }}
          >
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => setCurrentView("rating")}
            >
              <CustomText style={{ color: "#000" }}>
                {review.rating.overall?.toFixed(1)}
              </CustomText>
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
        <View style={{ marginVertical: 10 }}>
          <CustomText>{review.title}</CustomText>
          <HTML
            source={{ html: review.content }}
            baseFontStyle={{
              fontFamily: "MMedium",
              color: theme === "light" ? "#000" : "#fafafa",
            }}
          />
        </View>
      ) : (
        <SpecTable
          currentOption="Rating"
          rating={review.rating}
          spec={null}
          category={category}
        />
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonIconContainer}
          onPress={() => reportPost(review)}
        >
          <Image
            source={require("../../assets/images/flag.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        {(user && user.id === review.author?.id) || true ? (
          <TouchableOpacity
            style={styles.buttonIconContainer}
            onPress={() => {
              updatePost(review);
            }}
          >
            <Image
              source={require("../../assets/images/pencil.png")}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        ) : null}

        {(user && user.id === review.author?.id) || true ? (
          <TouchableOpacity
            style={styles.buttonIconContainer}
            onPress={() => {
              const images = review.images.map((image) => {
                return image.path;
              });
              deletePost(review, images);
            }}
          >
            <Image
              source={require("../../assets/images/trash.png")}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginVertical: 20,
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
  buttonsContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  buttonIconContainer: {
    marginTop: 10,
    marginEnd: 15,
  },
  buttonIcon: {
    width: 28,
    height: 28,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#D1D1D1",
  },
});

export default ReviewItem;
