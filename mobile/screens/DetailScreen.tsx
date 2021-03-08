import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import GeneralScreenTab from "./GeneralScreenTab";
import SpecScreenTab from "./SpecScreenTab";

interface Props {}

const DetailScreen: React.FC<Props> = ({}) => {
  const initialLayout = { width: Dimensions.get("window").width };

  const renderTabBar = (props) => (
    <View>
      <TabBar
        {...props}
        style={styles.tabView}
        tabStyle={{ width: 120 }}
        scrollEnabled={true}
        indicatorStyle={{
          backgroundColor: "white",
          height: 5,
          borderRadius: 10,
        }}
      >
        <Text>Hello</Text>
      </TabBar>
    </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "general", title: "First" },
    { key: "spec", title: "Second" },
  ]);

  const renderScene = SceneMap({
    general: GeneralScreenTab,
    spec: SpecScreenTab,
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
    backgroundColor: "#A8D8AD",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default DetailScreen;
