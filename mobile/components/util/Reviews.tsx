import React from "react";
import { Alert, FlatList, ListRenderItem } from "react-native";
import { useAuth } from "../../context/AuthContext";
import {
  Review,
  useCreateReportMutation,
  useCreateReviewMutation,
  useDeleteImagesMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../generated/graphql";
import { ScreenNavigationProp } from "../../utils/types";
import ReviewItem from "../deviceDetail/ReviewItem";
import EmptyPlaceholder from "./EmptyPlaceholder";

interface Props {
  reviews: Array<Review>;
  navigation: ScreenNavigationProp;
  category: string;
}

const Reviews: React.FC<Props> = ({ category, navigation, reviews }) => {
  const { user } = useAuth();

  const [updateReviewMutation, {}] = useUpdateReviewMutation();
  const [deleteReviewMutation, {}] = useDeleteReviewMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [createReportMutation] = useCreateReportMutation();

  const renderReviewItem: ListRenderItem<Review> = ({ item }) => {
    return (
      <ReviewItem
        review={item}
        category={category}
        goToAccount={(userId) => navigation.push("Account", { userId })}
        updatePost={(review) => {
          navigation.push("Compose", {
            header: "Update review",
            title: review.title,
            content: review.content,
            rating: review.rating,
            category: category,
            onCompose: (title, content, rating, images) => {
              if (!title) return;
              console.log("hello");
              handleUpdateReview(review.id, title, content, rating, images);
            },
          });
        }}
        deletePost={(review, images) => {
          createAlert("Delete post", "Do you want to delete this post?", () => {
            handleDeleteReview(review.id, images);
          });
        }}
        reportPost={(review) => {
          navigation.push("Compose", {
            header: "Report",
            title: "",
            content: "",
            category: category,
            onCompose: (title, content, rating, images) => {
              if (!title) return;
              handleCreateReport(review.id, title, content);
            },
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
        deleteImagesMutation({
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
  if (!reviews.length) return <EmptyPlaceholder />;

  return (
    <FlatList
      style={{
        paddingHorizontal: 15,
      }}
      data={reviews}
      renderItem={renderReviewItem}
    />
  );
};

export default Reviews;
