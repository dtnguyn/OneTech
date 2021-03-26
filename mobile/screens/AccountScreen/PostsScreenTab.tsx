import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import CustomSwitch from "../../components/auth/CustomSwitch";
import ProblemItem from "../../components/deviceDetail/ProblemItem";
import CustomText from "../../components/util/CustomText";
import PrivatePlaceHolder from "../../components/util/PrivatePlaceHolder";
import Problems from "../../components/util/Problems";
import Solutions from "../../components/util/Solutions";
import {
  DeviceProblem,
  Solution,
  useProblemsQuery,
  useSolutionsQuery,
} from "../../generated/graphql";
import { ScreenNavigationProp } from "../../utils/types";

interface Props {
  userId: string;
  navigation: ScreenNavigationProp;
}

const PostsScreenTab: React.FC<Props> = ({ userId, navigation }) => {
  const [currentOption, setCurrentOption] = useState("Problems");
  const [problems, setProblems] = useState<DeviceProblem[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  const { data: problemsData, error: problemsError } = useProblemsQuery({
    variables: {
      authorId: userId,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: solutionsData, error: solutionsError } = useSolutionsQuery({
    variables: {
      userId: userId,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const arr = problemsData?.problems?.data as DeviceProblem[];
    if (arr) {
      setProblems(arr);
    }
  }, [problemsData]);

  useEffect(() => {
    const arr = solutionsData?.solutions.data as Solution[];
    if (arr) {
      setSolutions(arr);
    }
  }, [solutionsData]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50 }}>
        <CustomSwitch
          options={["Problems", "Solutions"]}
          changeOption={(option) => setCurrentOption(option)}
          currentOption={currentOption}
        />
      </View>

      {currentOption === "Problems" ? (
        <Problems
          flatListStyle={{
            width: "100%",
            paddingHorizontal: 10,
          }}
          problems={problems}
          navigation={navigation}
        />
      ) : (
        <Solutions
          navigation={navigation}
          checkAvailable={false}
          solutions={solutions}
          flatListStyle={{
            width: "100%",
            paddingHorizontal: 10,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    height: "100%",
    alignItems: "center",
  },
});

export default PostsScreenTab;
