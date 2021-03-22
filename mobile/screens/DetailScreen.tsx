import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import CustomText from "../components/util/CustomText";
import { useTheme } from "../context/ThemeContext";
import { DetailRouteProp, ScreenNavigationProp } from "../utils/types";
import GeneralScreenTab from "./GeneralScreenTab";
import ProblemScreenTab from "./ProblemScreenTab";
import ReviewScreenTab from "./ReviewScreenTab";
import SpecScreenTab from "./SpecScreenTab";

interface Props {
  route: DetailRouteProp;
  navigation: ScreenNavigationProp;
}
type State = NavigationState<{
  key: string;
  title: string;
}>;

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "general", title: "General" },
    { key: "spec", title: "Specifications" },
    { key: "problem", title: "Problems" },
    { key: "review", title: "Reviews" },
  ]);

  const { theme } = useTheme();

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    general: () => <GeneralScreenTab deviceId={route.params.id} />,
    spec: () => <SpecScreenTab deviceId={route.params.id} />,
    problem: () => (
      <ProblemScreenTab deviceId={route.params.id} navigation={navigation} />
    ),
    review: () => (
      <ReviewScreenTab
        deviceId={route.params.id}
        navigation={navigation}
        category={route.params.category}
      />
    ),
  });

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <View>
      <TabBar
        {...props}
        style={{
          ...styles.tabView,
          backgroundColor: theme === "light" ? "#A8D8AD" : "#336B39",
        }}
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
  },
});

// (DetailScreen as any).sharedElements = (route: DetailRouteProp) => {
//   const deviceId = route.params.id;
//   return [
//     {
//       id: deviceId,
//       animation: "fade",
//     },
//   ];

//   return [deviceId];
// };

export default DetailScreen;
