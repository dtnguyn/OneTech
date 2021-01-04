import {
  Solution,
  SolutionStar,
  useCreateSolutionMutation,
  useDeleteImagesMutation,
  useDeleteSolutionMutation,
  useToggleSolutionPickedMutation,
  useToggleSolutionStarMutation,
  useUpdateSolutionMutation,
} from "../../generated/graphql";
import SolutionItem from "./SolutionItem";
import styles from "../../styles/ProblemDetail.module.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import CustomEditor from "../CustomEditor";
import { useAuth } from "../../context/AuthContext";
import ConfirmationDialog from "../ConfirmationDialog";

interface SolutionsProps {
  problemId: string;
  solutions: Solution[];
}

const Solutions: React.FC<SolutionsProps> = ({ solutions, problemId }) => {
  const [pickedSolution, setPickedSolution] = useState<Solution | null>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
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

  const [createSolutionMutation, {}] = useCreateSolutionMutation();
  const [updateSolutionMutation, {}] = useUpdateSolutionMutation();
  const [deleteSolutionMutation, {}] = useDeleteSolutionMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [toggleSolutionStarMutation, {}] = useToggleSolutionStarMutation();
  const [toggleSolutionPickedMutation, {}] = useToggleSolutionPickedMutation();

  const handleCreateSolution = async (
    problemId: string,
    authorId: string,
    content: string,
    images: string[]
  ) => {
    await createSolutionMutation({
      variables: {
        problemId,
        authorId,
        content,
        images,
      },
      update: (cache) => {
        cache.evict({ fieldName: "singleProblem" });
      },
    })
      .then((res) => {
        if (res.data?.createSolution.status) {
          resetSolutionValue();
          setAdding(false);
        } else {
          throw new Error(res.data?.createSolution.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
        cache.evict({ fieldName: "singleProblem" });
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
          cache.evict({ fieldName: "singleProblem" });
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
        cache.evict({ fieldName: "singleProblem" });
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

  const handleToggleSolutionPicked = (
    solverId: string,
    solutionId: string,
    problemId: string
  ) => {
    toggleSolutionPickedMutation({
      variables: {
        solutionId,
        solverId,
        problemId,
      },
      update: (cache) => {
        cache.evict({ fieldName: "singleProblem" });
      },
    })
      .then((res) => {
        if (!res.data?.toggleSolutionPicked.status) {
          throw new Error(res.data?.toggleSolutionPicked.message);
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

  useEffect(() => {
    let picked = null;
    for (const solution of solutions) {
      if (solution.isPicked) {
        picked = solution;
        break;
      }
    }
    setPickedSolution(picked);
  }, [solutions]);

  return (
    <div className={styles.solutionsContainer}>
      {adding || editing ? (
        <>
          <h4 className={styles.solutionsTitle}>Solutions</h4>
          <CustomEditor
            value={solutionValue.content}
            positiveText={adding ? "Submit" : "Save"}
            submitAllow={solutionValue.content !== ""}
            handleChange={(text, _) => {
              setSolutionValue({ ...solutionValue, content: text });
            }}
            handleSubmit={(images) => {
              if (adding) {
                if (!user) return;
                handleCreateSolution(
                  problemId,
                  user!.id,
                  solutionValue.content,
                  images
                );
              } else {
                if (!user || !solutionValue.id) return;
                handleUpdateSolution(
                  solutionValue.id,
                  images,
                  solutionValue.content
                );
              }
            }}
            handleCancel={() => {
              setAdding(false);
              setEditing(false);
              resetSolutionValue();
            }}
          />
        </>
      ) : (
        <>
          <br />
          {pickedSolution ? (
            <>
              <h4 className={styles.solutionsTitle}>Picked solution</h4>
              <SolutionItem
                solution={pickedSolution}
                starred={isStarred(
                  pickedSolution.stars ? pickedSolution.stars : []
                )}
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
                handleTogglePicked={(solutionId, solverId) => {
                  if (!user) return;
                  handleToggleSolutionPicked(solverId, solutionId, problemId);
                }}
              />
            </>
          ) : null}
          <h4 className={styles.solutionsTitle}>
            {pickedSolution ? "Other solutions" : "Solutions"}
          </h4>
          <Button onClick={() => setAdding(true)}>Add a solution</Button>
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
                  handleTogglePicked={(solutionId, solverId) => {
                    if (!user) return;
                    handleToggleSolutionPicked(solverId, solutionId, problemId);
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
