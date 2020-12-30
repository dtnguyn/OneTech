import ProblemItem from "./ProblemItem";

import styles from "../../styles/DeviceDetail.module.css";
import {
  DeviceProblem,
  DeviceProblemStar,
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

  const [editTextValue, setEditTextValue] = useState<string>("");
  const [problemTitleValue, setProblemTitleValue] = useState<string>("");
  const [editProblemId, setEditProblemId] = useState<string | null>(null);
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
    }).then((res) => {
      if (res.data?.createProblem?.status) {
        const newProblem = res.data?.createProblem.data![0] as DeviceProblem;
        console.log(newProblem);
        if (newProblem) setProblems([newProblem, ...problems]);

        closeAdding();
        setProblemTitleValue("");
        setEditTextValue("");
      }
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
    }).then((res) => {
      if (res.data?.updateProblem.status) {
        const updatedProblem = res.data?.updateProblem
          .data![0] as DeviceProblem;
        console.log(updatedProblem);
        setProblems(
          problems.map((_problem) => {
            if (_problem.id === updatedProblem.id) {
              return updatedProblem;
            }
            return _problem;
          })
        );
        closeEditing();
        setProblemTitleValue("");
        setEditTextValue("");
      }
    });
  };

  const handleDeleteProblem = async (id: string, images: string[]) => {
    try {
      await deleteImagesMutation({
        variables: {
          imageIds: images,
        },
      });

      await deleteProblemMutation({
        variables: {
          id,
        },
      }).then((res) => {
        if (res.data?.deleteProblem.status) {
          setProblems(
            problems.filter((_problem) => {
              return _problem.id != id;
            })
          );
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleProblemStar = async (
    problem: DeviceProblem,
    isStarred: boolean
  ) => {
    if (!user) return;
    await toggleProblemStarMutation({
      variables: {
        problemId: problem.id,
        userId: user!.id,
      },
    }).then((res) => {
      if (res.data?.toggleProblemStar.status) {
        const starred = !isStarred;
        const updatedProblem = res.data.toggleProblemStar
          .data![0] as DeviceProblem;
        setProblems(
          problems.map((_problem) => {
            if (problem.id === _problem.id) {
              return updatedProblem;
            }
            return _problem;
          })
        );
      }
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
            value={problemTitleValue}
            onChange={(e) => setProblemTitleValue(e.target.value)}
          />
          <CustomEditor
            value={editTextValue}
            positiveText={adding ? "Submit" : "Save"}
            submitAllow={editTextValue !== "" && problemTitleValue !== ""}
            handleChange={(text, _) => {
              setEditTextValue(text);
            }}
            handleSubmit={(images) => {
              if (adding) {
                if (!user) return;
                handleCreateProblem(
                  deviceId,
                  user!.id,
                  problemTitleValue,
                  editTextValue,
                  images
                );
              } else {
                if (!user || !editProblemId) return;
                handleEditProblem(
                  editProblemId,
                  problemTitleValue,
                  editTextValue,
                  images
                );
              }
            }}
            handleCancel={() => {
              closeAdding();
              closeEditing();
              setEditTextValue("");
              setProblemTitleValue("");
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
                handleToggleProblemStar(problem, isStarred)
              }
              handleDelete={initialDeleteProblemDialog}
              handleEdit={(problemId) => {
                setEditProblemId(problemId);
                setProblemTitleValue(problem.title);
                setEditTextValue(problem.content);
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
