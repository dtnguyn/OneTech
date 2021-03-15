import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ReviewItem from "../components/deviceDetail/ReviewItem";
import { useReviews } from "../context/ReviewContext";
import {
  Review,
  ReviewRating,
  useCreateReviewMutation,
  useDeleteImagesMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../generated/graphql";
import { ScreenNavigationProp } from "../utils/types";

interface Props {
  deviceId: string;
  navigation: ScreenNavigationProp;
  category: string;
  submitSearchValue: (text: string) => void;
}

const ReviewScreenTab: React.FC<Props> = ({
  deviceId,
  category,
  navigation,
  submitSearchValue,
}) => {
  const { reviews } = useReviews();

  const [createReviewMutation, {}] = useCreateReviewMutation();
  const [updateReviewMutation, {}] = useUpdateReviewMutation();
  const [deleteReviewMutation, {}] = useDeleteReviewMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();

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
      />
    );
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
