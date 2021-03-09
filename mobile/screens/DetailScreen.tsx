import React from "react";
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
import GeneralScreenTab from "./GeneralScreenTab";
import SpecScreenTab from "./SpecScreenTab";

interface Props {}
type State = NavigationState<{
  key: string;
  title: string;
}>;

const DetailScreen: React.FC<Props> = ({}) => {
  const initialLayout = { width: Dimensions.get("window").width };

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
        renderLabel={({ route, focused }) => (
          <CustomText>{route.title}</CustomText>
        )}
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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "general", title: "General" },
    { key: "spec", title: "Specifications" },
    { key: "problem", title: "Problems" },
    { key: "review", title: "Reviews" },
  ]);

  const renderScene = SceneMap({
    general: GeneralScreenTab,
    spec: SpecScreenTab,
    problem: GeneralScreenTab,
    review: SpecScreenTab,
  });

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
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default DetailScreen;
