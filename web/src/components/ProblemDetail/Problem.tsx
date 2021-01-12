import { Avatar, Divider } from "@material-ui/core";
import {
  DeviceProblem,
  DeviceProblemStar,
  useCreateReportMutation,
  useDeleteImagesMutation,
  useDeleteProblemMutation,
  useToggleProblemStarMutation,
  useUpdateProblemMutation,
} from "../../generated/graphql";
import StatsBox from "../StatsBox";
import moment from "moment";
import parse from "html-react-parser";
import classes from "@material-ui/styles";
import { useAuth } from "../../context/AuthContext";
import detailStyles from "../../styles/ProblemDetail.module.css";
import styles from "../../styles/DeviceDetail.module.css";
import React, { useState } from "react";
import CustomEditor from "../CustomEditor";
import ConfirmationDialog from "../ConfirmationDialog";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import FormDialog from "../FormDialog";

interface ProblemProps {
  problem: DeviceProblem;
}

const Problem: React.FC<ProblemProps> = ({ problem }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { error: alert } = useAlert();
  const [problemValue, setProblemValue] = useState({
    id: "",
    title: "",
    content: "",
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

  const [editing, setEditing] = useState(false);

  const [toggleProblemStarMutation, {}] = useToggleProblemStarMutation();
  const [deleteProblemMutation, {}] = useDeleteProblemMutation();
  const [updateProblemMutation, {}] = useUpdateProblemMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [createReportMutation] = useCreateReportMutation();

  const resetProblemValue = () => {
    setProblemValue({
      id: "",
      title: "",
      content: "",
    });
  };

  const isStarred = (stars: DeviceProblemStar[]) => {
    for (const star of stars) {
      if (star.userId === user?.id) {
        return true;
      }
    }
    return false;
  };

  const handleEditProblem = async (
    id: string,
    title: string,
    content: string,
    images: string[]
  ) => {
    if (!user) {
      alert("Please login first.");
      return;
    }
    await updateProblemMutation({
      variables: {
        id,
        title,
        content,
        images,
      },
    })
      .then((res) => {
        if (res.data?.updateProblem.status) {
          setEditing(false);
          resetProblemValue();
        } else {
          throw Error(res.data?.updateProblem.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteProblem = async (id: string, images: string[]) => {
    if (!user) {
      alert("Please login first.");
      return;
    }
    try {
      if (images.length != 0) {
        await deleteImagesMutation({
          variables: {
            imageIds: images,
          },
        });
      }

      await deleteProblemMutation({
        variables: {
          id,
        },
        update: (cache) => {
          cache.evict({ fieldName: "problems" });
          cache.evict({ fieldName: "singleProblem" });
        },
      }).then((res) => {
        if (res.data?.deleteProblem.status) {
          router.back();
        } else {
          throw Error(res.data?.deleteProblem.message);
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleProblemStar = async (problem: DeviceProblem) => {
    if (!user) {
      alert("Please login first.");
      return;
    }
    await toggleProblemStarMutation({
      variables: {
        problemId: problem.id,
        userId: user!.id,
      },
    })
      .then((res) => {
        if (!res.data?.toggleProblemStar.status) {
          throw Error(res.data?.toggleProblemStar.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const initialDeleteProblemDialog = (id: string, images: string[]) => {
    setConfirmationDialog({
      ...confirmationDialog,
      show: true,
      title: "Delete Problem",
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
        handleDeleteProblem(id, images);
        setConfirmationDialog({
          ...confirmationDialog,
          show: false,
        });
      },
    });
  };

  const initialReportProblemDialog = (id: string) => {
    setFormDialog({
      ...formDialog,
      id,
      show: true,
      title: "Report this problem!",
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
            authorId: user?.id as string,
            problemId: id,
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

  return (
    <div>
      {!editing ? (
        <div className={detailStyles.problemContainer}>
          <div className={styles.problemItemStatsContainer}>
            <img
              src={problem.author?.avatar}
              className={styles.postAvatar}
              onClick={() => router.push(`/user/${problem?.author?.id}`)}
            />

            <StatsBox
              number={problem.stars!.length ? problem.stars!.length : 0}
              title="stars"
              color="yellow"
            />
            <StatsBox
              number={problem.solutions!.length ? problem.solutions!.length : 0}
              title="solutions"
              color="green"
            />
          </div>

          <div className={styles.problemItemPostContainer}>
            <h4 className={styles.problemItemTitle}>{problem.title}</h4>
            <p className={styles.postDate}>
              {moment(problem.createdAt).format("LL")}
            </p>
            <div className={detailStyles.problemButtonsContainer}>
              <img
                src={
                  isStarred(problem.stars ? problem.stars! : [])
                    ? `/images/starred.png`
                    : `/images/star.png`
                }
                className={detailStyles.problemButton}
                onClick={() => {
                  handleToggleProblemStar(problem);
                }}
              />

              <img
                src="/images/flag.png"
                className={detailStyles.problemButton}
                onClick={() => initialReportProblemDialog(problem.id)}
              />
              {user?.id === problem.author?.id ? (
                <div>
                  <img
                    src="/images/trash.png"
                    className={detailStyles.problemButton}
                    onClick={() => {
                      const images = problem.images?.map((image) => {
                        return image.path;
                      });
                      initialDeleteProblemDialog(problem.id, images);
                    }}
                  />
                  <img
                    src="/images/pencil.png"
                    className={detailStyles.problemButton}
                    onClick={() => {
                      setProblemValue({
                        ...problemValue,
                        id: problem.id,
                        title: problem.title,
                        content: problem.content,
                      });

                      setEditing(true);
                    }}
                  />
                </div>
              ) : null}
            </div>

            <div className="divider" />
            <br />
            <div className={styles.problemItemContent}>
              {parse(problem.content)}
            </div>
          </div>
        </div>
      ) : (
        <div className={detailStyles.problemEditorContainer}>
          <input
            placeholder="Enter topic... *"
            value={problemValue.title}
            onChange={(e) =>
              setProblemValue({ ...problemValue, title: e.target.value })
            }
          />
          <CustomEditor
            value={problemValue.content}
            positiveText={"Save"}
            submitAllow={
              problemValue.content !== "" && problemValue.title !== ""
            }
            handleChange={(text, _) => {
              setProblemValue({ ...problemValue, content: text });
            }}
            handleSubmit={(images) => {
              handleEditProblem(
                problem.id,
                problemValue.title,
                problemValue.content,
                images
              );
            }}
            handleCancel={() => {
              setEditing(false);
            }}
          />
        </div>
      )}

      <div className="divider" />
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

export default Problem;
