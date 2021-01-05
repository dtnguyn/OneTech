import {
  Solution,
  SolutionStar,
  useCreateSolutionMutation,
  useDeleteImagesMutation,
  useDeleteSolutionMutation,
  useSolutionsQuery,
  useToggleSolutionPickedMutation,
  useToggleSolutionStarMutation,
  useUpdateSolutionMutation,
} from "../../generated/graphql";

import styles from "../../styles/ProblemDetail.module.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import CustomEditor from "../CustomEditor";
import { useAuth } from "../../context/AuthContext";
import ConfirmationDialog from "../ConfirmationDialog";
import SolutionItem from "../ProblemDetail/SolutionItem";

interface SolutionsProps {
  solutions: Solution[];
  editing: boolean;
  setEditing: (status: boolean) => void;
}

const Solutions: React.FC<SolutionsProps> = ({
  solutions,
  editing,
  setEditing,
}) => {
  const [solutionValue, setSolutionValue] = useState({
    id: "",
    content: "",
  });
  const { user } = useAuth();

  const [confirmationDialog, setConfirmationDialog] = useState({
    show: false,
    title: "",
    content: "",
    positiveText: "",
    negativeText: "",
    handleNegative: () => {},
    handlePositive: () => {},
  });

  const [updateSolutionMutation, {}] = useUpdateSolutionMutation();
  const [deleteSolutionMutation, {}] = useDeleteSolutionMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [toggleSolutionStarMutation, {}] = useToggleSolutionStarMutation();

  const { data } = useSolutionsQuery({
    variables: {
      userId: user?.id,
    },
  });

  const handleUpdateSolution = async (
    id: string,
    images: string[],
    content?: string,
    isPicked?: boolean
  ) => {
    await updateSolutionMutation({
      variables: {
        id,
        content,
        isPicked,
        images,
      },
      update: (cache) => {
        cache.evict({ fieldName: "solutions" });
      },
    })
      .then((res) => {
        if (res.data?.updateSolution.status) {
          setEditing(false);
          resetSolutionValue();
        } else {
          throw new Error(res.data?.updateSolution.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteSolution = async (id: string, images: string[]) => {
    try {
      if (images.length !== 0) {
        await deleteImagesMutation({
          variables: {
            imageIds: images,
          },
        });
      }
      await deleteSolutionMutation({
        variables: {
          id,
        },
        update: (cache) => {
          // cache.evict({ fieldName: "singleProblem" });
          cache.evict({ fieldName: "solutions" });
        },
      }).then((res) => {
        if (!res.data?.deleteSolution.status) {
          throw new Error(res.data?.deleteSolution.message);
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleSolutionStar = (userId: string, solutionId: string) => {
    toggleSolutionStarMutation({
      variables: {
        solutionId,
        userId,
      },
      update: (cache) => {
        // cache.evict({ fieldName: "singleProblem" });
        cache.evict({ fieldName: "solutions" });
      },
    })
      .then((res) => {
        if (!res.data?.toggleSolutionStar.status) {
          throw new Error(res.data?.toggleSolutionStar.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const resetSolutionValue = () => {
    setSolutionValue({
      id: "",
      content: "",
    });
  };

  const initialDeleteSolutionDialog = (id: string, images: string[]) => {
    setConfirmationDialog({
      ...confirmationDialog,
      show: true,
      title: "Delete Solution",
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
        handleDeleteSolution(id, images);
        setConfirmationDialog({
          ...confirmationDialog,
          show: false,
        });
      },
    });
  };

  const isStarred = (stars: SolutionStar[]) => {
    for (const star of stars) {
      if (star.userId === user?.id) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={styles.solutionsContainer}>
      {editing ? (
        <>
          <h4 className={styles.solutionsTitle}>Solutions</h4>
          <CustomEditor
            value={solutionValue.content}
            positiveText="Save"
            submitAllow={solutionValue.content !== ""}
            handleChange={(text, _) => {
              setSolutionValue({ ...solutionValue, content: text });
            }}
            handleSubmit={(images) => {
              if (!user || !solutionValue.id) return;
              handleUpdateSolution(
                solutionValue.id,
                images,
                solutionValue.content
              );
            }}
            handleCancel={() => {
              setEditing(false);
              resetSolutionValue();
            }}
          />
        </>
      ) : (
        <>
          {solutions.map((solution) => {
            if (solution.isPicked) return null;
            else
              return (
                <SolutionItem
                  key={solution.id}
                  solution={solution}
                  starred={isStarred(solution.stars ? solution.stars : [])}
                  handleDelete={(id, images) => {
                    initialDeleteSolutionDialog(id, images);
                  }}
                  handleEdit={(id, content) => {
                    setSolutionValue({
                      ...solutionValue,
                      id,
                      content,
                    });
                    setEditing(true);
                  }}
                  handleToggleStar={(id) => {
                    if (!user) return;
                    handleToggleSolutionStar(user.id, id);
                  }}
                />
              );
          })}
        </>
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

export default Solutions;
