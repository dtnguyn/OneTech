import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ReviewItem from "../components/deviceDetail/ReviewItem";
import {
  Review,
  ReviewRating,
  useCreateReportMutation,
  useCreateReviewMutation,
  useDeleteImagesMutation,
  useDeleteReviewMutation,
  useReviewsQuery,
  useUpdateReviewMutation,
} from "../generated/graphql";
import { ScreenNavigationProp } from "../utils/types";

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

  const [createReviewMutation, {}] = useCreateReviewMutation();
  const [updateReviewMutation, {}] = useUpdateReviewMutation();
  const [deleteReviewMutation, {}] = useDeleteReviewMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [createReportMutation] = useCreateReportMutation();

  const { data: reviewsData, error: reviewsError } = useReviewsQuery({
    variables: {
      deviceId,
      title: reviewSearchValue,
      content: reviewSearchValue,
    },
    fetchPolicy: "cache-and-network",
  });

  const renderReviewItem: ListRenderItem<Review> = ({ item }) => {
    return (
      <ReviewItem
        review={item}
        category={category}
        updatePost={(review) => {
          navigation.push("Compose", {
            header: "Update review",
            title: review.title,
            content: review.content,
            rating: review.rating,
            category: category,
            onCompose: (title, content, rating, images) => {
              handleUpdateReview(review.id, title, content, rating, images);
            },
          });
        }}
        deletePost={(review) => {
          createAlert("Delete post", "Do you want to delete this post?", () => {
            handleDeleteReview(review.id, []);
          });
        }}
        reportPost={(review) => {
          navigation.push("Compose", {
            header: "Report",
            title: "",
            content: "",
            category: category,
            onCompose: (title, content, rating, images) => {
              handleCreateReport(review.id, title, content);
            },
          });
        }}
      />
    );
  };

  let reviewTimeout: NodeJS.Timeout;
  const handleSearchReview = (text: string) => {
    clearTimeout(reviewTimeout);
    reviewTimeout = setTimeout(() => {
      setReviewSearchValue(text);
    }, 700);
  };

  const createAlert = (
    title: string,
    content: string,
    callback: () => void
  ) => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "Nope",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => callback() },
      ],
      { cancelable: false }
    );
  };

  const handleCreateReport = (id: string, title: string, content: string) => {
    createReportMutation({
      variables: {
        title,
        content,
        reviewId: id,
      },
    })
      .then((response) => {
        if (response.data?.createReport.status) {
        } else {
          throw new Error(response.data?.createReport.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
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

  const handleUpdateReview = (
    id: string,
    title: string,
    content: string,
    rating: any,
    images: string[]
  ) => {
    updateReviewMutation({
      variables: {
        id,
        title,
        content,
        overall: rating.overall,
        display: rating.display,
        processor: rating.processor,
        battery: rating.battery,
        software: rating.software,
        camera: rating.camera,
        gpu: rating.gpu,
        memory: rating.memory,
        thermals: rating.thermals,
        ports: rating.ports,
        images,
      },
      update: (cache) => {
        cache.evict({ fieldName: "ratings" });
      },
    })
      .then((res) => {
        if (res.data?.updateReview?.status) {
        } else {
          throw new Error(res.data?.updateReview?.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteReview = async (id: string, images: string[]) => {
    try {
      if (images.length !== 0) {
        await deleteImagesMutation({
          variables: {
            imageIds: images,
          },
        });
      }

      await deleteReviewMutation({
        variables: {
          id,
        },
        update: (cache) => {
          cache.evict({ fieldName: "reviews" });
        },
      }).then((res) => {
        if (!res.data?.deleteReview.status) {
          throw new Error(res.data?.deleteReview.message);
        }
      });
    } catch (error) {
      alert(error.message);
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Find problems..."
          onChangeText={(text) => {
            handleSearchReview(text);
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
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
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
                handleCreateReview(deviceId, title, content, rating, images);
              },
            });
          }}
        >
          <Image
            style={styles.floatingIcon}
            source={require("../assets/images/add2.png")}
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
