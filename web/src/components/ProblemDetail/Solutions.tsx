import {
  Solution,
  SolutionStar,
  useCreateReportMutation,
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
import { useAlert } from "react-alert";
import FormDialog from "../FormDialog";
import Empty from "../Empty";

interface SolutionsProps {
  problemId: string;
  problemAuthorId: string;
  solutions: Solution[];
}

const Solutions: React.FC<SolutionsProps> = ({
  solutions,
  problemId,
  problemAuthorId,
}) => {
  const { error: alert } = useAlert();
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

  const [formDialog, setFormDialog] = useState({
    id: "",
    show: false,
    title: "",
    cancelText: "",
    submitText: "",
    handleCancel: () => {},
    handleSubmit: (title: string, content: string) => {},
  });

  const [createSolutionMutation, {}] = useCreateSolutionMutation();
  const [updateSolutionMutation, {}] = useUpdateSolutionMutation();
  const [deleteSolutionMutation, {}] = useDeleteSolutionMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [toggleSolutionStarMutation, {}] = useToggleSolutionStarMutation();
  const [toggleSolutionPickedMutation, {}] = useToggleSolutionPickedMutation();
  const [createReportMutation] = useCreateReportMutation();

  const handleCreateSolution = async (
    problemId: string,
    content: string,
    images: string[]
  ) => {
    await createSolutionMutation({
      variables: {
        problemId,
        content,
        images,
      },
      update: (cache) => {
        cache.evict({ fieldName: "singleProblem" });
        cache.evict({ fieldName: "solutions" });
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
        cache.evict({ fieldName: "solutions" });
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

  const initialReportSolutionDialog = (id: string) => {
    setFormDialog({
      ...formDialog,
      id,
      show: true,
      title: "Report this solution!",
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
            solutionId: id,
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
                if (!user) {
                  alert("Please login first.");
                  return;
                }
                handleCreateSolution(problemId, solutionValue.content, images);
              } else {
                if (!user) {
                  alert("Please login first.");
                  return;
                }
                if (!solutionValue.id) return;
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
              <h4 className={styles.pickedSolutionTitle}>Picked solution</h4>
              <SolutionItem
                solution={pickedSolution}
                problemAuthorId={problemAuthorId}
                handleReport={initialReportSolutionDialog}
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
                  if (!user) {
                    alert("Please login first.");
                    return;
                  }
                  handleToggleSolutionStar(user.id, id);
                }}
                handleTogglePicked={(solutionId, solverId) => {
                  if (!user) {
                    alert("Please login first.");
                    return;
                  }
                  handleToggleSolutionPicked(solverId, solutionId, problemId);
                }}
              />
            </>
          ) : null}
          <h4 className={styles.solutionsTitle}>
            {pickedSolution ? "Other solutions" : "Solutions"}
          </h4>
          <Button onClick={() => setAdding(true)}>Add a solution</Button>
          {solutions.length ? (
            solutions.map((solution) => {
              if (solution.isPicked) return null;
              else
                return (
                  <SolutionItem
                    key={solution.id}
                    problemAuthorId={problemAuthorId}
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
                      if (!user) {
                        alert("Please login first.");
                        return;
                      }
                      handleToggleSolutionStar(user.id, id);
                    }}
                    handleTogglePicked={(solutionId, solverId) => {
                      if (!user) {
                        alert("Please login first.");
                        return;
                      }
                      handleToggleSolutionPicked(
                        solverId,
                        solutionId,
                        problemId
                      );
                    }}
                    handleReport={initialReportSolutionDialog}
                  />
                );
            })
          ) : (
            <Empty />
          )}
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

export default Solutions;
