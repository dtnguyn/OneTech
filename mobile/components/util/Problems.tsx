import React from "react";
import {
  Alert,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAuth } from "../../context/AuthContext";
import {
  DeviceProblem,
  DeviceProblemStar,
  useCreateProblemMutation,
  useCreateReportMutation,
  useDeleteImagesMutation,
  useDeleteProblemMutation,
  useToggleProblemStarMutation,
  useUpdateProblemMutation,
} from "../../generated/graphql";
import { ScreenNavigationProp } from "../../utils/types";
import ProblemItem from "../deviceDetail/ProblemItem";
import EmptyPlaceholder from "./EmptyPlaceholder";

interface Props {
  problems: DeviceProblem[];
  flatListStyle?: StyleProp<ViewStyle>;
  navigation: ScreenNavigationProp;
}

const Problems: React.FC<Props> = ({ problems, flatListStyle, navigation }) => {
  const { user } = useAuth();

  const [toggleProblemStarMutation, {}] = useToggleProblemStarMutation();
  const [createProblemMutation, {}] = useCreateProblemMutation();
  const [updateProblemMutation, {}] = useUpdateProblemMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [deleteProblemMutation, {}] = useDeleteProblemMutation();
  const [createReportMutation] = useCreateReportMutation();

  const renderProblemItem: ListRenderItem<DeviceProblem> = ({ item }) => {
    return (
      <ProblemItem
        problem={item}
        goToAccount={(userId) => navigation.push("Account", { userId })}
        clickAction={(problemId) =>
          navigation.push("Solution", { problemId, deviceId: item.device.id })
        }
        starred={isStarred(item.stars!)}
        toggleStar={handleToggleProblemStar}
        updatePost={(problem) => {
          navigation.push("Compose", {
            header: "Update problem",
            title: problem.title,
            content: problem.content,
            category: null,
            onCompose: (title, content, _rating, images) => {
              if (!title || !content) return;
              handleEditProblem(problem.id, title, content, images);
            },
          });
        }}
        deletePost={(problem) => {
          createAlert("Delete post", "Do you want to delete this post?", () => {
            handleDeleteProblem(problem.id, []);
          });
        }}
        reportPost={(problem) => {
          navigation.push("Compose", {
            header: "Report",
            title: "",
            content: "",
            category: null,
            onCompose: (title, content, _rating, _images) => {
              if (!title || !content) return;
              handleCreateReport(problem.id, title, content);
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

  const isStarred = (stars: DeviceProblemStar[] | undefined) => {
    if (!stars) return false;
    for (const star of stars) {
      if (star.userId === user?.id) {
        return true;
      }
    }
    return false;
  };

  const handleCreateReport = (id: string, title: string, content: string) => {
    createReportMutation({
      variables: {
        title,
        content,
        problemId: id,
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
      update: (cache) => {
        cache.evict({ fieldName: "problems" });
      },
    })
      .then((res) => {
        if (res.data?.updateProblem.status) {
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
          throw new Error(res.data?.toggleProblemStar.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!problems.length) return <EmptyPlaceholder />;
  return (
    <FlatList
      style={flatListStyle}
      data={problems}
      renderItem={renderProblemItem}
    />
  );
};

export default Problems;
