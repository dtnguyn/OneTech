import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import CustomText from "../components/util/CustomText";
import {
  Device,
  ReviewRating,
  useDeviceDetailQuery,
  useDeviceRatingsQuery,
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

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    general: () => <GeneralScreenTab device={device} />,
    spec: () => <SpecScreenTab device={device} rating={rating} />,
    problem: () => (
      <ProblemScreenTab
        deviceId={device ? device.id : ""}
        category={device ? device.category : "phone"}
        navigation={navigation}
      />
    ),
    review: () => (
      <ReviewScreenTab
        deviceId={device ? device.id : ""}
        navigation={navigation}
        category={device ? device.category : "phone"}
      />
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
