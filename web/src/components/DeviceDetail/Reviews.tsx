import React, { useEffect, useState } from "react";
import {
  Review,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import ConfirmationDialog from "../ConfirmationDialog";
import CustomEditor from "../CustomEditor";
import ReviewItem from "./ReviewItem";
import Slider from "@material-ui/core/Slider";
import mitt from "next/dist/next-server/lib/mitt";
import CustomSlider from "../CustomSlider";

import { useReview } from "../../context/ReviewContext";
import { useAuth } from "../../context/AuthContext";

interface ReviewsProps {
  deviceId: string;
  category: string;
  adding: boolean;
  editing: boolean;
  openAdding: () => void;
  closeAdding: () => void;
  openEditing: () => void;
  closeEditing: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({
  deviceId,
  category,
  adding,
  editing,
  openAdding,
  openEditing,
  closeAdding,
  closeEditing,
}) => {
  const { reviews, setReviews } = useReview();
  const { user } = useAuth();

  const [reviewValue, setReviewValue] = useState({
    id: "",
    title: "",
    content: "",
    rating: {
      overall: 0,
      display: 0,
      processor: 0,
      battery: 0,
      software: 0,
      camera: 0,
    } as any,
  });

  const [confirmationDialog, setConfirmationDialog] = useState({
    show: false,
    title: "",
    content: "",
    positiveText: "",
    negativeText: "",
    handleNegative: () => {},
    handlePositive: () => {},
  });

  const [specsArr, setSpecsArr] = useState<Array<string>>([]);

  const [createReviewMutation, {}] = useCreateReviewMutation();
  const [deleteReviewMutation, {}] = useDeleteReviewMutation();
  const [updateReviewMutation, {}] = useUpdateReviewMutation();

  const resetReviewValue = () => {
    setReviewValue({
      id: "",
      title: "",
      content: "",
      rating: {
        overall: 0,
        display: 0,
        processor: 0,
        battery: 0,
        software: 0,
        camera: 0,
      },
    });
  };

  const calculateOverall = () => {
    let rating = reviewValue.rating;
    let ready = true;
    let sum = 0;
    for (const spec of specsArr) {
      if (rating[spec.toLowerCase()] === 0) {
        ready = false;
        break;
      } else {
        sum += rating[spec.toLowerCase()];
      }
    }
    rating.overall = ready ? sum / specsArr.length : 0;
    setReviewValue({
      ...reviewValue,
      rating,
    });
  };

  const handleCreateReview = async (
    deviceId: string,
    authorId: string,
    title: string,
    content: string,
    rating: any,
    images: string[]
  ) => {
    await createReviewMutation({
      variables: {
        deviceId,
        authorId,
        title,
        content,
        overall: rating.overall,
        display: rating.display,
        battery: rating.battery,
        processor: rating.processor,
        software: rating.software,
        camera: rating.camera,
        images,
      },
    })
      .then((res) => {
        if (res.data?.createReview?.status) {
          console.log("Create review successfully");
          const newReview = res.data.createReview.data![0] as Review;
          setReviews([newReview, ...reviews]);
          resetReviewValue();
          closeAdding();
        } else {
          throw Error(res.data?.createReview?.message);
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
        images,
      },
    })
      .then((res) => {
        if (res.data?.updateReview?.status) {
          const updatedReview = res.data.updateReview.data![0] as Review;
          setReviews(
            reviews.map((review) => {
              if (review.id === updatedReview.id) return updatedReview;
              return review;
            })
          );
          resetReviewValue();
          closeEditing();
        } else {
          throw Error(res.data?.updateReview?.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteReview = async (id: string) => {
    await deleteReviewMutation({
      variables: {
        id,
      },
    })
      .then((res) => {
        if (res.data?.deleteReview.status) {
          setReviews(
            reviews.filter((review) => {
              return review.id !== id;
            })
          );
        } else throw Error(res.data?.deleteReview.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const initialDeleteReviewDialog = (id: string) => {
    setConfirmationDialog({
      ...confirmationDialog,
      show: true,
      title: "Delete Review",
      content: "Do you want to delete this post?",
      positiveText: "Yes",
      negativeText: "Nope",
      handleNegative: () => {
        setConfirmationDialog({
          ...confirmationDialog,
          show: false,
        });
      },
      handlePositive: () => {
        handleDeleteReview(id);
        setConfirmationDialog({
          ...confirmationDialog,
          show: false,
        });
      },
    });
  };

  useEffect(() => {
    switch (category) {
      case "phone":
        setSpecsArr(["Display", "Processor", "Battery", "Software", "Camera"]);
        break;
      case "laptop":
        setSpecsArr(["Display", "Processor", "Battery", "Software", "Camera"]);
        break;
      case "pc":
        setSpecsArr(["Display", "Processor", "Battery", "Software", "Camera"]);
        break;
    }
  }, []);

  return (
    <div className={styles.reviewsContainer}>
      {adding || editing ? (
        <>
          <input
            placeholder="Enter topic... *"
            value={reviewValue.title}
            onChange={(e) =>
              setReviewValue({ ...reviewValue, title: e.target.value })
            }
          />
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <CustomEditor
                value={reviewValue.content}
                positiveText={adding ? "Submit" : "Save"}
                submitAllow={
                  reviewValue.title !== "" &&
                  reviewValue.content !== "" &&
                  reviewValue.rating.overall !== 0
                }
                handleChange={(text, _) =>
                  setReviewValue({ ...reviewValue, content: text })
                }
                handleSubmit={(images) => {
                  if (adding) {
                    //adding review
                    if (!user) return;
                    handleCreateReview(
                      deviceId,
                      user.id,
                      reviewValue.title,
                      reviewValue.content,
                      reviewValue.rating,
                      images
                    );
                  } else {
                    if (!user) return;
                    //edit review
                    handleUpdateReview(
                      reviewValue.id,
                      reviewValue.title,
                      reviewValue.content,
                      reviewValue.rating,
                      images
                    );
                  }
                }}
                handleCancel={() => {
                  closeAdding();
                  closeEditing();
                  resetReviewValue();
                }}
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <br />
              <h5>Rating</h5>
              <br />
              {specsArr.map((spec) => (
                <>
                  <p>{spec}</p>
                  <CustomSlider
                    defaultValue={reviewValue.rating[spec.toLowerCase()]}
                    onChangeCommitted={(_, value) => {
                      console.log(reviewValue);
                      const rating = reviewValue.rating;
                      rating[spec.toLowerCase()] = value;
                      setReviewValue({ ...reviewValue, rating });
                      calculateOverall();
                    }}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={0.5}
                    min={0}
                    max={10}
                  />
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        reviews.map((review) => {
          return (
            <ReviewItem
              key={review.id}
              review={review}
              handleDelete={(id: string) => {
                initialDeleteReviewDialog(id);
              }}
              handleEdit={(review: Review) => {
                console.log(review.rating);
                const rating = reviewValue.rating;
                const newRating = review.rating as any;
                for (const spec of specsArr) {
                  rating[spec.toLowerCase()] = newRating[spec.toLowerCase()];
                }
                rating.overall = newRating.overall;
                setReviewValue({
                  ...reviewValue,
                  id: review.id,
                  title: review.title,
                  content: review.content,
                  rating,
                });
                openEditing();
              }}
            />
          );
        })
      )}
      <ConfirmationDialog
        show={confirmationDialog.show}
        title={confirmationDialog.title}
        content={confirmationDialog.content}
        negativeText={confirmationDialog.negativeText}
        positiveText={confirmationDialog.positiveText}
        handleNegativeButtonClick={confirmationDialog.handleNegative}
        handlePositiveButtonClick={confirmationDialog.handlePositive}
      />
    </div>
  );
};

export default Reviews;
