import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ProblemItem from "../components/deviceDetail/ProblemItem";
import EmptyPlaceholder from "../components/util/EmptyPlaceholder";
import { useAuth } from "../context/AuthContext";
import {
  DeviceProblem,
  DeviceProblemStar,
  useCreateProblemMutation,
  useCreateReportMutation,
  useDeleteImagesMutation,
  useDeleteProblemMutation,
  useProblemsQuery,
  useToggleProblemStarMutation,
  useUpdateProblemMutation,
} from "../generated/graphql";
import { ScreenNavigationProp } from "../utils/types";

interface Props {
  deviceId: string;
  category: string;
  navigation: ScreenNavigationProp;
}

const ProblemScreenTab: React.FC<Props> = ({
  deviceId,
  category,
  navigation,
}) => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Array<DeviceProblem>>();
  const [problemSearchValue, setProblemSearchValue] = useState("");

  const [toggleProblemStarMutation, {}] = useToggleProblemStarMutation();
  const [createProblemMutation, {}] = useCreateProblemMutation();
  const [updateProblemMutation, {}] = useUpdateProblemMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();
  const [deleteProblemMutation, {}] = useDeleteProblemMutation();
  const [createReportMutation] = useCreateReportMutation();

  const { data: problemsData, error: problemsError } = useProblemsQuery({
    variables: {
      deviceId,
      title: problemSearchValue,
      content: problemSearchValue,
    },
    fetchPolicy: "cache-and-network",
  });

  let problemTimeout: NodeJS.Timeout;
  const handleSearchProblem = (text: string) => {
    clearTimeout(problemTimeout);
    problemTimeout = setTimeout(() => {
      setProblemSearchValue(text);
    }, 700);
  };

  const renderProblemItem: ListRenderItem<DeviceProblem> = ({ item }) => {
    return (
      <ProblemItem
        problem={item}
        clickAction={(problemId) =>
          navigation.push("Solution", { problemId, deviceId, category })
        }
        starred={isStarred(item.stars!)}
        toggleStar={handleToggleProblemStar}
        updatePost={(problem) => {
          navigation.push("Compose", {
            header: "Update problem",
            title: problem.title,
            content: problem.content,
            category: category,
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
            category: category,
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

  const handleCreateProblem = async (
    title: string,
    content: string,
    images: string[]
  ) => {
    if (!user) {
      return;
    }
    await createProblemMutation({
      variables: {
        deviceId,
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
        } else {
          throw new Error(res.data?.createProblem?.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
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

  useEffect(() => {
    const problemArr = problemsData?.problems?.data as DeviceProblem[];

    if (problemArr && problemArr.length != 0) {
      //found problems
      setProblems(problemArr);
    } else if (problemArr && problemArr.length == 0) {
      //not found
      setProblems([]);
    }
  }, [problemsData]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Find problems..."
          onChangeText={(text) => {
            handleSearchProblem(text);
          }}
        />
        <Image
          source={require("../assets/images/search.png")}
          style={styles.searchIcon}
        />
      </View>
      {problems?.length ? (
        <FlatList
          style={{
            width: "100%",
            paddingHorizontal: 10,
          }}
          data={problems}
          renderItem={renderProblemItem}
        />
      ) : (
        <EmptyPlaceholder />
      )}

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.push("Compose", {
              header: "Add a problem",
              title: "",
              content: "",
              category: category,
              onCompose: (title, content, _rating, images) => {
                if (!title || !content) return;
                handleCreateProblem(title, content, images);
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
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  textInputContainer: {
    marginTop: 20,
    width: "90%",
  },
  textInput: {
    fontFamily: "MMedium",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 5,
    paddingEnd: 40,
    marginBottom: 20,
  },
  searchIcon: {
    position: "absolute",
    right: 5,
    top: 8,
    width: 32,
    height: 32,
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

export default ProblemScreenTab;
