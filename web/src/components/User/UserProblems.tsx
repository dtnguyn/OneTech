import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useAuth } from "../../context/AuthContext";
import {
  DeviceProblem,
  DeviceProblemStar,
  useCreateProblemMutation,
  useDeleteImagesMutation,
  useDeleteProblemMutation,
  useProblemsQuery,
  User,
  useToggleProblemStarMutation,
  useUpdateProblemMutation,
} from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import { client } from "../../utils/withApollo";
import ConfirmationDialog from "../ConfirmationDialog";
import CustomEditor from "../CustomEditor";
import ProblemItem from "../DeviceDetail/ProblemItem";

interface ProblemsProps {
  user: User;
  problems: DeviceProblem[];
  editing: boolean;
  setEditing: (status: boolean) => void;
}

const Problems: React.FC<ProblemsProps> = ({
  user,
  problems,
  editing,
  setEditing,
}) => {
  const { error: alert } = useAlert();
  const [problemValue, setProblemValue] = useState({
    id: "",
    title: "",
    content: "",
  });

  const { user: authUser } = useAuth();

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
  const [deleteProblemMutation, {}] = useDeleteProblemMutation();
  const [updateProblemMutation, {}] = useUpdateProblemMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();

  const { data: problemsData } = useProblemsQuery({
    variables: {
      authorId: user?.id,
    },
    client: client,
  });

  const isStarred = (stars: DeviceProblemStar[]) => {
    for (const star of stars) {
      if (star.userId === authUser?.id) {
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
          throw new Error(res.data?.updateProblem.message);
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
          cache.evict({ fieldName: "solutions" });
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
    if (!user) {
      alert("Please login first.");
      return;
    }
    if (!authUser) return;
    await toggleProblemStarMutation({
      variables: {
        problemId: problem.id,
        userId: authUser!.id,
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
      {editing ? (
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
            positiveText="Save"
            submitAllow={
              problemValue.content !== "" && problemValue.title !== ""
            }
            handleChange={(text, _) => {
              setProblemValue({ ...problemValue, content: text });
            }}
            handleSubmit={(images) => {
              if (!authUser || !problemValue.id) return;
              handleEditProblem(
                problemValue.id,
                problemValue.title,
                problemValue.content,
                images
              );
            }}
            handleCancel={() => {
              setEditing(false);
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
              handleToggleStar={(problem) => handleToggleProblemStar(problem)}
              handleDelete={initialDeleteProblemDialog}
              handleEdit={(problemId) => {
                setProblemValue({
                  ...problemValue,
                  id: problemId,
                  title: problem.title,
                  content: problem.content,
                });

                setEditing(true);
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
