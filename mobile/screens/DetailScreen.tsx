import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view";
import CustomText from "../components/util/CustomText";
import { ProblemContext } from "../context/ProblemContext";
import { ReviewContext } from "../context/ReviewContext";
import {
  Device,
  DeviceProblem,
  Review,
  ReviewRating,
  useDeviceDetailQuery,
  useDeviceRatingsQuery,
  useProblemsQuery,
  useReviewsQuery,
} from "../generated/graphql";
import { RootStackParamList } from "../utils/types";
import GeneralScreenTab from "./GeneralScreenTab";
import ProblemScreenTab from "./ProblemScreenTab";
import ReviewScreenTab from "./ReviewScreenTab";
import SpecScreenTab from "./SpecScreenTab";

interface Props {
  props: StackScreenProps<RootStackParamList, "Detail">;
}
type State = NavigationState<{
  key: string;
  title: string;
}>;

const DetailScreen: React.FC<Props> = ({ route, navigation }: any) => {
  const [device, setDevice] = useState<Device>();
  const [rating, setRating] = useState<ReviewRating>();
  const [problems, setProblems] = useState<DeviceProblem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [problemSearchValue, setProblemSearchValue] = useState("");
  const [reviewSearchValue, setReviewSearchValue] = useState("");

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "general", title: "General" },
    { key: "spec", title: "Specifications" },
    { key: "problem", title: "Problems" },
    { key: "review", title: "Reviews" },
  ]);

  const { data, error } = useDeviceDetailQuery({
    variables: {
      id: route.params.id as string,
    },
    fetchPolicy: "network-only",
  });

  const { data: ratingData } = useDeviceRatingsQuery({
    variables: {
      deviceId: route.params.id as string,
    },
    fetchPolicy: "network-only",
  });

  const { data: problemsData, error: problemsError } = useProblemsQuery({
    variables: {
      deviceId: route.params.id as string,
      title: problemSearchValue,
      content: problemSearchValue,
    },
    fetchPolicy: "network-only",
  });

  const { data: reviewsData, error: reviewsError } = useReviewsQuery({
    variables: {
      deviceId: route.params.id as string,
      title: reviewSearchValue,
      content: reviewSearchValue,
    },
    fetchPolicy: "network-only",
  });

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    general: () => <GeneralScreenTab device={device} />,
    spec: () => <SpecScreenTab device={device} rating={rating} />,
    problem: () => (
      <ProblemContext.Provider value={{ problems, setProblems }}>
        <ProblemScreenTab
          deviceId={device ? device.id : ""}
          navigation={navigation}
          submitSearchValue={handleSearchProblem}
        />
      </ProblemContext.Provider>
    ),
    review: () => (
      <ReviewContext.Provider value={{ reviews, setReviews }}>
        <ReviewScreenTab submitSearchValue={handleSearchReview} />
      </ReviewContext.Provider>
    ),
  });

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <View>
      <TabBar
        {...props}
        style={styles.tabView}
        scrollEnabled={true}
        activeColor="#000"
        inactiveColor="#000"
        renderLabel={({ route }) => <CustomText>{route.title}</CustomText>}
        indicatorStyle={{
          backgroundColor: "white",
          height: 2,
          borderRadius: 10,
        }}
      >
        <Text>Hello</Text>
      </TabBar>
    </View>
  );

  let problemTimeout: NodeJS.Timeout;
  const handleSearchProblem = (text: string) => {
    clearTimeout(problemTimeout);
    problemTimeout = setTimeout(() => {
      setProblemSearchValue(text);
    }, 700);
  };

  let reviewTimeout: NodeJS.Timeout;
  const handleSearchReview = (text: string) => {
    clearTimeout(reviewTimeout);
    reviewTimeout = setTimeout(() => {
      setReviewSearchValue(text);
    }, 700);
  };

  useEffect(() => {
    const devices = data?.singleDevice?.data as Device[];
    if (devices && devices.length != 0) {
      setDevice(devices[0]);
    }
  }, [data]);

  useEffect(() => {
    const ratings = ratingData?.ratings?.data as ReviewRating[];
    if (ratings && ratings?.length === 1) {
      setRating(ratings[0]);
    }
  }, [ratingData]);

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

  useEffect(() => {
    const reviewArr = reviewsData?.reviews?.data as Review[];

    if (reviewArr && reviewArr.length != 0) {
      //found reviews
      setReviews(reviewArr);
    } else if (reviewArr && reviewArr.length == 0) {
      //not found
      setReviews([]);
    }
  }, [reviewsData]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ elevation: 2 }}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    color: "#000",
    backgroundColor: "#A8D8AD",
  },
});

export default DetailScreen;
