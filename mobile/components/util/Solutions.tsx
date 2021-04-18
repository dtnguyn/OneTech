import React from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useReviews } from "../../context/ReviewContext";
import {
  Solution,
  SolutionStar,
  useCreateReportMutation,
  useDeleteImagesMutation,
  useDeleteSolutionMutation,
  useToggleSolutionPickedMutation,
  useToggleSolutionStarMutation,
  useUpdateSolutionMutation,
} from "../../generated/graphql";
import { ScreenNavigationProp } from "../../utils/types";
import SolutionItem from "../solution/SolutionItem";
import EmptyPlaceholder from "./EmptyPlaceholder";

interface Props {
  flatListStyle: StyleProp<ViewStyle>;
  solutions: Solution[];
  checkAvailable: boolean;
  navigation: ScreenNavigationProp;
}

const Solutions: React.FC<Props> = ({
  solutions,
  navigation,
  checkAvailable,
  flatListStyle,
}) => {
  const { user } = useAuth();

  const [updateSolutionMutation, {}] = useUpdateSolutionMutation();
  const [deleteSolutionMutation, {}] = useDeleteSolutionMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [toggleSolutionStarMutation, {}] = useToggleSolutionStarMutation();
  const [toggleSolutionPickedMutation, {}] = useToggleSolutionPickedMutation();
  const [createReportMutation] = useCreateReportMutation();

  const renderSolutionList: ListRenderItem<Solution> = ({ item }) => {
    return (
      <SolutionItem
        solution={item}
        starred={isStarred(item.stars!)}
        checkPost={
          checkAvailable
            ? (solution) => {
                console.log(solution.problemId);
                handleToggleSolutionPicked(
                  solution.author.id,
                  solution.id,
                  solution.problemId
                );
              }
            : null
        }
        toggleStar={(solution) => {
          handleToggleSolutionStar(user!.id, solution.id);
        }}
        updatePost={(solution) => {
          navigation.push("Compose", {
            header: "Update solution",
            title: null,
            content: solution.content,
            category: null,
            onCompose: (_title, content, _rating, images) => {
              handleUpdateSolution(solution.id, images, content);
            },
          });
        }}
        deletePost={(solution, images) => {
          createAlert(
            "Delete Post",
            "Do you want to delete this solution",
            () => {
              handleDeleteSolution(solution.id, images);
            }
          );
        }}
        reportPost={(solution) => {
          navigation.push("Compose", {
            header: "Report solution",
            title: "",
            content: "",
            category: null,
            onCompose: (title, content, _rating, images) => {
              if (!title || !content) return;
              handleCreateReport(solution.id, title, content);
            },
          });
        }}
      />
    );
  };

  const createAlert = (
    title: string,
    content: string,
    callback: () => void
  ) => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "Nope",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => callback() },
      ],
      { cancelable: false }
    );
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
  const handleCreateReport = (id: string, title: string, content: string) => {
    createReportMutation({
      variables: {
        title,
        content,
        solutionId: id,
      },
    })
      .then((response) => {
        if (response.data?.createReport.status) {
          console.log("create report successfully");
        } else {
          throw new Error(response.data?.createReport.message);
        }
      })
      .catch((error) => {
        alert(error.message);
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

  if (!solutions.length) return <EmptyPlaceholder />;

  return (
    <FlatList
      style={flatListStyle}
      data={solutions}
      renderItem={renderSolutionList}
    />
  );
};

export default Solutions;
