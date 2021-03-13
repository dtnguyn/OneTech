import { useFonts } from "expo-font";
import React from "react";
import {
  Image,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ProblemItem from "../components/deviceDetail/ProblemItem";
import { useAuth } from "../context/AuthContext";
import { useProblems } from "../context/ProblemContext";
import {
  DeviceProblem,
  DeviceProblemStar,
  useCreateProblemMutation,
  useToggleProblemStarMutation,
} from "../generated/graphql";
import { ScreenNavigationProp } from "../utils/types";

interface Props {
  deviceId: string;
  navigation: ScreenNavigationProp;
  submitSearchValue: (text: string) => void;
}

const ProblemScreenTab: React.FC<Props> = ({
  deviceId,
  navigation,
  submitSearchValue,
}) => {
  useFonts({
    MMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  const { user } = useAuth();
  const { problems, setProblems } = useProblems();

  const renderProblemItem: ListRenderItem<DeviceProblem> = ({ item }) => {
    return (
      <ProblemItem
        problem={item}
        starred={isStarred(item.stars!)}
        toggleStar={handleToggleProblemStar}
      />
    );
  };

  const [toggleProblemStarMutation, {}] = useToggleProblemStarMutation();
  const [createProblemMutation, {}] = useCreateProblemMutation();

  const isStarred = (stars: DeviceProblemStar[] | undefined) => {
    if (!stars) return false;
    for (const star of stars) {
      if (star.userId === user?.id) {
        return true;
      }
    }
    return false;
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

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Find problems..."
          onChangeText={(text) => {
            submitSearchValue(text);
          }}
        />
        <Image
          source={require("../assets/images/search.png")}
          style={styles.searchIcon}
        />
      </View>
      <FlatList
        style={{
          width: "95%",
        }}
        data={problems}
        renderItem={renderProblemItem}
      />
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.push("Compose", {
              header: "Add a problem",
              title: "",
              content: "",
              onCompose: (title, content, images) => {
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
