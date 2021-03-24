import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Solutions from "../components/util/Solutions";
import { useTheme } from "../context/ThemeContext";
import {
  DeviceProblem,
  Solution,
  useCreateSolutionMutation,
  useProblemDetailQuery,
} from "../generated/graphql";
import { ScreenNavigationProp, SolutionRouteProp } from "../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
  route: SolutionRouteProp;
}

const SolutionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const { data, loading, error } = useProblemDetailQuery({
    variables: {
      id: route.params.problemId,
    },
    fetchPolicy: "cache-and-network",
  });
  const [createSolutionMutation, {}] = useCreateSolutionMutation();
  const { theme } = useTheme();

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
      <Solutions
        solutions={solutions}
        checkAvailable={true}
        navigation={navigation}
        flatListStyle={{
          width: "100%",
          paddingHorizontal: 10,
        }}
      />
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
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
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
