import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import CustomText from "../../components/util/CustomText";
import {
  Device,
  ReviewRating,
  useDeviceDetailQuery,
  useDeviceRatingsQuery,
} from "../../generated/graphql";
import { AccountRouteProp, ScreenNavigationProp } from "../../utils/types";
import NotificationsScreen from "./NotificationsScreenTab";
import PostsScreenTab from "./PostsScreenTab";
import ProfileScreenTab from "./ProfileScreenTab";
import SettingsScreenTab from "./SettingsScreenTab";

interface Props {
  route: AccountRouteProp;
  navigation: ScreenNavigationProp;
}
type State = NavigationState<{
  key: string;
  title: string;
}>;

const AccountScreen: React.FC<Props> = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "profile", title: "Profile" },
    { key: "posts", title: "Posts" },
    { key: "notifications", title: "Notifications" },
    { key: "settings", title: "Settings" },
  ]);

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    profile: () => (
      <ProfileScreenTab userId={route.params.userId} navigation={navigation} />
    ),
    posts: () => (
      <PostsScreenTab userId={route.params.userId} navigation={navigation} />
    ),
    notifications: () => <NotificationsScreen />,
    settings: () => <SettingsScreenTab />,
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

export default AccountScreen;
