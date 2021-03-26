import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import CustomText from "../../components/util/CustomText";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Device,
  ReviewRating,
  useDeviceDetailQuery,
  useDeviceRatingsQuery,
  useSettingQuery,
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

const authUserRoute = [
  { key: "profile", title: "Profile" },
  { key: "posts", title: "Posts" },
  { key: "notifications", title: "Notifications" },
  { key: "settings", title: "Settings" },
];

const userRoute = [
  { key: "profile", title: "Profile" },
  { key: "posts", title: "Posts" },
];

const AccountScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const [routes] = React.useState(
    user && user.id === route.params.userId ? authUserRoute : userRoute
  );
  const { theme } = useTheme();

  // const { data, error } = useSettingQuery({
  //   variables: {
  //     userId: user?.id!,
  //   },
  //   fetchPolicy: "cache-and-network",
  // });

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    profile: () => (
      <ProfileScreenTab userId={route.params.userId} navigation={navigation} />
    ),
    posts: () => (
      <PostsScreenTab userId={route.params.userId} navigation={navigation} />
    ),
    notifications: () =>
      user && user.id === route.params.userId ? <NotificationsScreen /> : null,
    settings: () =>
      user && user.id === route.params.userId ? <SettingsScreenTab /> : null,
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

export default AccountScreen;
