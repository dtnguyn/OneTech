import { useState } from "react";
import { useAlert } from "react-alert";
import { useAuth } from "../../context/AuthContext";
import {
  Solution,
  SolutionStar,
  useCreateReportMutation,
  useDeleteImagesMutation,
  useDeleteSolutionMutation,
  User,
  useToggleSolutionStarMutation,
  useUpdateSolutionMutation,
} from "../../generated/graphql";
import styles from "../../styles/ProblemDetail.module.css";
import ConfirmationDialog from "../ConfirmationDialog";
import CustomEditor from "../CustomEditor";
import Empty from "../Empty";
import FormDialog from "../FormDialog";
import SolutionItem from "../ProblemDetail/SolutionItem";

interface SolutionsProps {
  user: User;
  solutions: Solution[];
  editing: boolean;
  setEditing: (status: boolean) => void;
}

const Solutions: React.FC<SolutionsProps> = ({
  user,
  solutions,
  editing,
  setEditing,
}) => {
  const [solutionValue, setSolutionValue] = useState({
    id: "",
    content: "",
  });
  const { error: alert } = useAlert();
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

  const [formDialog, setFormDialog] = useState({
    id: "",
    show: false,
    title: "",
    cancelText: "",
    submitText: "",
    handleCancel: () => {},
    handleSubmit: (title: string, content: string) => {},
  });

  const [updateSolutionMutation, {}] = useUpdateSolutionMutation();
  const [deleteSolutionMutation, {}] = useDeleteSolutionMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [toggleSolutionStarMutation, {}] = useToggleSolutionStarMutation();
  const [createReportMutation] = useCreateReportMutation();

  const handleUpdateSolution = async (
    id: string,
    images: string[],
    content?: string,
    isPicked?: boolean
  ) => {
    if (!user) {
      alert("Please login first.");
      return;
    }
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
    if (!user) {
      alert("Please login first.");
      return;
    }
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
          cache.evict({ fieldName: "solutions" });
        },
      }).then((res) => {
        console.log(res);
        if (!res.data?.deleteSolution.status) {
          throw new Error(res.data?.deleteSolution.message);
        }
      });
    } catch (error) {
      console.log("print error");
      alert(error.message);
    }
  };

  const handleToggleSolutionStar = (userId: string, solutionId: string) => {
    if (!user) {
      alert("Please login first.");
      return;
    }
    toggleSolutionStarMutation({
      variables: {
        solutionId,
        userId,
      },
      update: (cache) => {
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
      if (star.userId === authUser?.id) {
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
              if (!authUser || !solutionValue.id) return;
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
          {solutions.length ? (
            solutions.map((solution) => {
              return (
                <SolutionItem
                  key={solution.id}
                  solution={solution}
                  accountPage={true}
                  handleReport={initialReportSolutionDialog}
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
                    if (!authUser) return;
                    handleToggleSolutionStar(authUser.id, id);
                  }}
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
