import React, { useEffect, useState } from "react";
import { Animated, ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ProblemItem from "../components/deviceDetail/ProblemItem";
import SolutionItem from "../components/solution/SolutionItem";
import CustomText from "../components/util/CustomText";
import {
  DeviceProblem,
  Solution,
  useProblemDetailQuery,
} from "../generated/graphql";
import { ScreenNavigationProp, SolutionRouteProp } from "../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
  route: SolutionRouteProp;
}

const SolutionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [problem, setProblem] = useState<DeviceProblem>();
  const [solutions, setSolutions] = useState<Solution[]>();
  const [pickedSolution, setPickedSolution] = useState<Solution>();
  const { data, loading, error } = useProblemDetailQuery({
    variables: {
      id: route.params.problemId,
    },
  });

  const renderSolutionList: ListRenderItem<Solution> = ({ item }) => {
    return <SolutionItem solution={item} />;
  };

  const renderHeader = () => {
    if (!problem) return null;
    return (
      <View style={styles.problemContainer}>
        <ProblemItem
          problem={problem}
          clickAction={(problemId) => {}}
          starred={
            // isStarred(item.stars!)
            true
          }
          toggleStar={() => {}}
          updatePost={(problem) => {
            //   navigation.push("Compose", {
            //     header: "Update problem",
            //     title: problem.title,
            //     content: problem.content,
            //     category: category,
            //     onCompose: (title, content, _rating, images) => {
            //       handleEditProblem(problem.id, title, content, images);
            //     },
            //   });
          }}
          deletePost={(problem) => {
            //   createAlert("Delete post", "Do you want to delete this post?", () => {
            //     handleDeleteProblem(problem.id, []);
            //   });
          }}
          reportPost={(problem) => {
            //   navigation.push("Compose", {
            //     header: "Report",
            //     title: "",
            //     content: "",
            //     category: category,
            //     onCompose: (title, content, _rating, _images) => {
            //       handleCreateReport(problem.id, title, content);
            //     },
            //   });
          }}
        />
        <CustomText
          style={{ marginTop: 20 }}
          fontFamily="MSemiBold"
          fontSize={20}
        >
          Solutions
        </CustomText>
        {pickedSolution ? (
          <View style={{ width: "100%" }}>
            <SolutionItem solution={pickedSolution} />
          </View>
        ) : null}
      </View>
    );
  };

  useEffect(() => {
    const arr = data?.singleProblem.data as DeviceProblem[];
    if (arr && arr.length === 1) {
      const prob = arr[0];
      setProblem(arr[0]);

      if (prob.solutions) {
        for (const solution of prob.solutions) {
          if (solution.isPicked) {
            setPickedSolution(solution);
            break;
          }
        }

        setSolutions(prob.solutions.filter((solution) => !solution.isPicked));
      }
    }
  }, [data]);

  if (!problem) return null;
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          width: "100%",
          paddingHorizontal: 10,
        }}
        data={solutions}
        renderItem={renderSolutionList}
        ListHeaderComponent={renderHeader}
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
});

export default SolutionScreen;
