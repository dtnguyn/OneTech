import { useFonts } from "expo-font";
import React from "react";
import {
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ProblemItem from "../components/deviceDetail/ProblemItem";
import { useAuth } from "../context/AuthContext";
import {
  DeviceProblem,
  DeviceProblemStar,
  useToggleProblemStarMutation,
} from "../generated/graphql";
import { FloatingAction } from "react-native-floating-action";

interface Props {
  problems: Array<DeviceProblem>;
  submitSearchValue: (text: string) => void;
}

const ProblemScreenTab: React.FC<Props> = ({ problems, submitSearchValue }) => {
  const [fontsLoaded] = useFonts({
    MMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  const { user } = useAuth();

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

  const isStarred = (stars: DeviceProblemStar[] | undefined) => {
    if (!stars) return false;
    for (const star of stars) {
      if (star.userId === user?.id) {
        return true;
      }
    }
    return false;
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
        <TouchableOpacity style={styles.floatingButton}>
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
    backgroundColor: "#fff",
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
