import React, { useEffect, useState } from "react";
import {
  Review,
  useCreateReportMutation,
  useCreateReviewMutation,
  useDeleteImagesMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import ConfirmationDialog from "../ConfirmationDialog";
import CustomEditor from "../CustomEditor";
import ReviewItem from "./ReviewItem";
import Slider from "@material-ui/core/Slider";

import { useReview } from "../../context/ReviewContext";
import { useAuth } from "../../context/AuthContext";
import CustomSlider from "../CustomSlider";
import { useAlert } from "react-alert";
import FormDialog from "../FormDialog";
import Empty from "../Empty";
import { laptopSpec, mobileSpec, pcSpec } from "../../utils/specArr";

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
  const { error: alert } = useAlert();
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
      gpu: 0,
      memory: 0,
      thermals: 0,
      ports: 0,
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

  const [formDialog, setFormDialog] = useState({
    id: "",
    show: false,
    title: "",
    cancelText: "",
    submitText: "",
    handleCancel: () => {},
    handleSubmit: (title: string, content: string) => {},
  });

  const [specsArr, setSpecsArr] = useState<Array<string>>([]);

  const [createReviewMutation, {}] = useCreateReviewMutation();
  const [deleteReviewMutation, {}] = useDeleteReviewMutation();
  const [updateReviewMutation, {}] = useUpdateReviewMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [createReportMutation] = useCreateReportMutation();

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
          resetReviewValue();
          closeAdding();
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
          resetReviewValue();
          closeEditing();
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

  const initialDeleteReviewDialog = (id: string, images: string[]) => {
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
        handleDeleteReview(id, images);
        setConfirmationDialog({
          ...confirmationDialog,
          show: false,
        });
      },
    });
  };

  const initialReportReviewDialog = (id: string) => {
    setFormDialog({
      ...formDialog,
      id,
      show: true,
      title: "Report this review!",
      submitText: "Submit",
      cancelText: "Cancel",
      handleCancel: () => {
        setFormDialog({
          ...formDialog,
          show: false,
        });
      },
      handleSubmit: (title, content) => {
        createReportMutation({
          variables: {
            title,
            content,
            reviewId: id,
          },
        })
          .then((response) => {
            if (response.data?.createReport.status) {
              setFormDialog({
                ...formDialog,
                show: false,
              });
            } else {
              throw new Error(response.data?.createReport.message);
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      },
    });
  };

  useEffect(() => {
    switch (category) {
      case "phone":
        setSpecsArr(mobileSpec);
        break;
      case "laptop":
        setSpecsArr(laptopSpec);
        break;
      case "pc":
        setSpecsArr(pcSpec);
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
          <div className="row flex-row-reverse">
            <div className="col-lg-6 col-md-12">
              <br />
              <h5>Rating</h5>
              <br />
              {specsArr.map((spec) => (
                <div key={spec}>
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
                    step={0.1}
                    min={0}
                    max={10}
                  />
                </div>
              ))}
            </div>
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
                    if (!user) {
                      alert("Please login first.");
                      return;
                    }
                    handleCreateReview(
                      deviceId,
                      reviewValue.title,
                      reviewValue.content,
                      reviewValue.rating,
                      images
                    );
                  } else {
                    if (!user) {
                      alert("Please login first.");
                      return;
                    }
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
          </div>
        </>
      ) : reviews.length ? (
        reviews.map((review) => {
          return (
            <ReviewItem
              key={review.id}
              review={review}
              category={category}
              handleDelete={(id: string, images: string[]) => {
                initialDeleteReviewDialog(id, images);
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
              handleReport={initialReportReviewDialog}
            />
          );
        })
      ) : (
        <Empty />
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

      <FormDialog
        title={formDialog.title}
        show={formDialog.show}
        handleClose={formDialog.handleCancel}
        handleSubmit={formDialog.handleSubmit}
        closeText={formDialog.cancelText}
        submitText={formDialog.submitText}
      />
    </div>
  );
};

export default Reviews;
