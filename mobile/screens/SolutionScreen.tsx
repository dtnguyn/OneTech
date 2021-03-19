import React, { useEffect, useState } from "react";
import { Alert, Image, ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import SolutionItem from "../components/solution/SolutionItem";
import EmptyPlaceholder from "../components/util/EmptyPlaceholder";
import { useAuth } from "../context/AuthContext";
import {
  DeviceProblem,
  Solution,
  SolutionStar,
  useCreateReportMutation,
  useCreateSolutionMutation,
  useDeleteImagesMutation,
  useDeleteSolutionMutation,
  useProblemDetailQuery,
  useToggleSolutionPickedMutation,
  useToggleSolutionStarMutation,
  useUpdateSolutionMutation,
} from "../generated/graphql";
import { ScreenNavigationProp, SolutionRouteProp } from "../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
  route: SolutionRouteProp;
}

const SolutionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [solutions, setSolutions] = useState<Solution[]>();
  const { data, loading, error } = useProblemDetailQuery({
    variables: {
      id: route.params.problemId,
    },
    fetchPolicy: "network-only",
  });
  const { user } = useAuth();
  const [createSolutionMutation, {}] = useCreateSolutionMutation();
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
        checkPost={(solution) => {
          handleToggleSolutionPicked(
            solution.author.id,
            solution.id,
            route.params.problemId
          );
        }}
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
        deletePost={(solution) => {
          createAlert(
            "Delete Post",
            "Do you want to delete this solution",
            () => {
              handleDeleteSolution(solution.id, []);
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

  useEffect(() => {
    const arr = data?.singleProblem.data as DeviceProblem[];
    if (arr && arr.length === 1) {
      const prob = arr[0];

      if (prob.solutions) {
        let picked = null;
        for (const solution of prob.solutions) {
          if (solution.isPicked) {
            picked = solution;
            break;
          }
        }
        const solutionArr: Solution[] = [];
        if (picked) solutionArr.push(picked);
        for (const solution of prob.solutions) {
          if (!solution.isPicked) {
            solutionArr.push(solution);
          }
        }

        setSolutions(solutionArr);
      }
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {!solutions?.length ? (
        <EmptyPlaceholder />
      ) : (
        <FlatList
          style={{
            width: "100%",
            paddingHorizontal: 10,
          }}
          data={solutions}
          renderItem={renderSolutionList}
        />
      )}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.push("Compose", {
              header: "Add a solution",
              title: null,
              content: "",
              category: null,
              onCompose: (_title, content, _rating, images) => {
                if (!content) return;
                handleCreateSolution(route.params.problemId, content, images);
              },
            })
          }
        >
          <Image
            style={styles.floatingIcon}
            source={require("../assets/images/add2.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    height: "100%",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#c4c4c4",
  },

  problemContainer: {
    marginTop: 10,
    alignItems: "center",
  },

  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  floatingButton: {
    width: 64,
    height: 64,
    borderRadius: 64,
    elevation: 4,
    backgroundColor: "#017BFE",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingIcon: {
    width: 28,
    height: 28,
  },
});

export default SolutionScreen;
