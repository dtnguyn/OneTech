import ProblemItem from "./ProblemItem";

import styles from "../../styles/DeviceDetail.module.css";
import {
  DeviceDetailDocument,
  DeviceDetailQuery,
  DeviceProblem,
  DeviceProblemStar,
  DevicesQuery,
  ProblemsDocument,
  ProblemsQuery,
  useCreateProblemMutation,
  useDeleteImagesMutation,
  useDeleteProblemMutation,
  useToggleProblemStarMutation,
  useUpdateProblemMutation,
} from "../../generated/graphql";
import { useProblem } from "../../context/ProblemContext";
import { useAuth } from "../../context/AuthContext";
import React, { useState } from "react";
import CustomEditor from "../CustomEditor";
import ConfirmationDialog from "../ConfirmationDialog";

interface ProblemsProps {
  deviceId: string;
  adding: boolean;
  openAdding: () => void;
  closeAdding: () => void;
  editing: boolean;
  openEditing: () => void;
  closeEditing: () => void;
}

const Problems: React.FC<ProblemsProps> = ({
  deviceId,
  adding,
  openAdding,
  closeAdding,
  editing,
  openEditing,
  closeEditing,
}) => {
  const { problems, setProblems } = useProblem();
  const { user } = useAuth();

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

  const [toggleProblemStarMutation, {}] = useToggleProblemStarMutation();
  const [createProblemMutation, {}] = useCreateProblemMutation();
  const [deleteProblemMutation, {}] = useDeleteProblemMutation();
  const [updateProblemMutation, {}] = useUpdateProblemMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();

  const isStarred = (stars: DeviceProblemStar[]) => {
    for (const star of stars) {
      if (star.userId === user?.id) {
        return true;
      }
    }
    return false;
  };

  const resetProblemValue = () => {
    setProblemValue({
      id: "",
      title: "",
      content: "",
    });
  };

  const handleCreateProblem = async (
    deviceId: string,
    authorId: string,
    title: string,
    content: string,
    images: string[]
  ) => {
    if (!user) return;
    await createProblemMutation({
      variables: {
        deviceId,
        authorId,
        title,
        content,
        images,
      },
      update: (cache) => {
        cache.evict({ fieldName: "problems" });
      },
    })
      .then((res) => {
        if (res.data?.createProblem?.status) {
          closeAdding();
          resetProblemValue();
        } else {
          throw new Error(res.data?.createProblem?.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleEditProblem = async (
    id: string,
    title: string,
    content: string,
    images: string[]
  ) => {
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
          closeEditing();
          resetProblemValue();
        } else {
          throw new Error(res.data?.updateProblem.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteProblem = async (id: string, images: string[]) => {
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
        },
      }).then((res) => {
        if (!res.data?.deleteProblem.status) {
          throw new Error(res.data?.deleteProblem.message);
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleProblemStar = async (problem: DeviceProblem) => {
    if (!user) return;
    await toggleProblemStarMutation({
      variables: {
        problemId: problem.id,
        userId: user!.id,
      },
    })
      .then((res) => {
        if (!res.data?.toggleProblemStar.status) {
          throw new Error(res.data?.toggleProblemStar.message);
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

  return (
    <div className={styles.problemsContainer}>
      {adding || editing ? (
        <>
          <input
            placeholder="Enter topic... *"
            value={problemValue.title}
            onChange={(e) =>
              setProblemValue({ ...problemValue, title: e.target.value })
            }
          />
          <CustomEditor
            value={problemValue.content}
            positiveText={adding ? "Submit" : "Save"}
            submitAllow={
              problemValue.content !== "" && problemValue.title !== ""
            }
            handleChange={(text, _) => {
              setProblemValue({ ...problemValue, content: text });
            }}
            handleSubmit={(images) => {
              if (adding) {
                if (!user) return;
                handleCreateProblem(
                  deviceId,
                  user!.id,
                  problemValue.title,
                  problemValue.content,
                  images
                );
              } else {
                if (!user || !problemValue.id) return;
                handleEditProblem(
                  problemValue.id,
                  problemValue.title,
                  problemValue.content,
                  images
                );
              }
            }}
            handleCancel={() => {
              closeAdding();
              closeEditing();
              resetProblemValue();
            }}
          />
        </>
      ) : (
        problems.map((problem) => {
          const starred = isStarred(problem.stars ? problem.stars : []);
          return (
            <ProblemItem
              starred={starred}
              key={problem.id}
              problem={problem}
              handleToggleStar={(problem, isStarred) =>
                handleToggleProblemStar(problem)
              }
              handleDelete={initialDeleteProblemDialog}
              handleEdit={(problemId) => {
                setProblemValue({
                  ...problemValue,
                  id: problemId,
                  title: problem.title,
                  content: problem.content,
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

export default Problems;
