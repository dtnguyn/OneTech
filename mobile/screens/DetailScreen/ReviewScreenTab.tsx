import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Reviews from "../../components/util/Reviews";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Review,
  ReviewRating,
  useCreateReviewMutation,
  useReviewsQuery,
} from "../../generated/graphql";
import { ScreenNavigationProp } from "../../utils/types";

interface Props {
  deviceId: string;
  navigation: ScreenNavigationProp;
  category: string;
}

const ReviewScreenTab: React.FC<Props> = ({
  deviceId,
  category,
  navigation,
}) => {
  const [reviews, setReviews] = useState<Array<Review>>();
  const [reviewSearchValue, setReviewSearchValue] = useState("");
  const { theme } = useTheme();
  const { user } = useAuth();

  const [createReviewMutation, {}] = useCreateReviewMutation();

  const { data: reviewsData, error: reviewsError } = useReviewsQuery({
    variables: {
      deviceId,
      title: reviewSearchValue,
      content: reviewSearchValue,
    },
    fetchPolicy: "cache-and-network",
  });

  let reviewTimeout: NodeJS.Timeout;
  const handleSearchReview = (text: string) => {
    clearTimeout(reviewTimeout);
    reviewTimeout = setTimeout(() => {
      setReviewSearchValue(text);
    }, 700);
  };

  const handleCreateReview = async (
    deviceId: string,
    title: string,
    content: string,
    rating: any,
    images: string[]
  ) => {
    await createReviewMutation({
      variables: {
        deviceId,
        title,
        content,
        overall: rating.overall,
        display: rating.display,
        battery: rating.battery,
        processor: rating.processor,
        software: rating.software,
        camera: rating.camera,
        gpu: rating.gpu,
        memory: rating.memory,
        thermals: rating.thermals,
        ports: rating.ports,
        images,
      },
      update: (cache) => {
        cache.evict({ fieldName: "reviews" });
        cache.evict({ fieldName: "ratings" });
      },
    })
      .then((res) => {
        if (res.data?.createReview?.status) {
        } else {
          throw new Error(res.data?.createReview?.message);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  useEffect(() => {
    const reviewArr = reviewsData?.reviews?.data as Review[];

    if (reviewArr && reviewArr.length != 0) {
      //found reviews
      setReviews(reviewArr);
    } else if (reviewArr && reviewArr.length == 0) {
      //not found
      setReviews([]);
    }
  }, [reviewsData]);

  useEffect(() => {
    if (reviewsError) {
      alert(reviewsError.message);
    }
  }, [reviewsError]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={{
            ...styles.textInput,
            color: theme === "light" ? "#000" : "#fafafa",
          }}
          placeholderTextColor={theme === "light" ? "#c4c4c4" : "#545454"}
          placeholder="Find problems..."
          onChangeText={(text) => {
            handleSearchReview(text);
          }}
        />
        <Image
          source={require("../../assets/images/search2.png")}
          style={styles.searchIcon}
        />
      </View>
      <Reviews
        category={category}
        navigation={navigation}
        reviews={reviews ? reviews : []}
      />
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            if (!user) {
              alert("You have to log in first.");
              return;
            }
            navigation.push("Compose", {
              header: "Add a review",
              title: "",
              content: "",
              rating: {
                overall: 0,
                display: 0,
                processor: 0,
                battery: 0,
                software: 0,
                camera: 0,
                gpu: 0,
                memory: 0,
                thermals: 0,
                ports: 0,
              } as ReviewRating,
              category: category,
              onCompose: (title, content, rating, images) => {
                if (!title) return;
                handleCreateReview(deviceId, title, content, rating, images);
              },
            });
          }}
        >
          <Image
            style={styles.floatingIcon}
            source={require("../../assets/images/add2.png")}
          />
        </TouchableOpacity>
      </View>
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
    borderWidth: 1,
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

  floatingButton: {
    width: 64,
    height: 64,
    borderRadius: 64,
    elevation: 4,
    backgroundColor: "#017BFE",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingIcon: {
    width: 28,
    height: 28,
  },
});

export default ReviewScreenTab;
