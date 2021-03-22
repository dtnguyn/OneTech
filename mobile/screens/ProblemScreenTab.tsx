import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProblemItem from "../components/deviceDetail/ProblemItem";
import EmptyPlaceholder from "../components/util/EmptyPlaceholder";
import Problems from "../components/util/Problems";
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
  navigation: ScreenNavigationProp;
}

const ProblemScreenTab: React.FC<Props> = ({ deviceId, navigation }) => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Array<DeviceProblem>>([]);
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

  const handleCreateProblem = async (
    deviceId: string,
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
      <Problems
        flatListStyle={{
          width: "100%",
          paddingHorizontal: 10,
        }}
        problems={problems}
        navigation={navigation}
      />

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.push("Compose", {
              header: "Add a problem",
              title: "",
              content: "",
              category: null,
              onCompose: (title, content, _rating, images) => {
                if (!title || !content) return;
                handleCreateProblem(deviceId, title, content, images);
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
