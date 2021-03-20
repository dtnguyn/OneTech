import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DeviceCarousel from "../../components/home/DeviceCarousel";
import CustomText from "../../components/util/CustomText";
import {
  Device,
  useDevicesQuery,
  User,
  useSingleUserQuery,
} from "../../generated/graphql";
import { ScreenNavigationProp } from "../../utils/types";

interface Props {
  userId: string;
  navigation: ScreenNavigationProp;
}

const ProfileScreenTab: React.FC<Props> = ({ userId, navigation }) => {
  const [user, setUser] = useState<User>();
  const [followedDevices, setFollowedDevices] = useState<Device[]>([]);
  const [starCount, setStarCount] = useState<number>();

  const { data: userData, error: userError } = useSingleUserQuery({
    variables: {
      id: userId,
    },
    fetchPolicy: "cache-and-network",
  });
  const {
    data: followedDevicesData,
    error: followedDevicesError,
  } = useDevicesQuery({
    variables: {
      userId,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    let count = 0;
    if (user?.problems && user.solutions) {
      for (const problem of user?.problems!) {
        count += problem.stars?.length!;
      }
      for (const solution of user?.solutions!) {
        count += solution.stars?.length!;
      }
    }

    setStarCount(count);
  }, [user]);

  useEffect(() => {
    const arr = followedDevicesData?.devices.data as Device[];
    if (arr) {
      setFollowedDevices(arr);
    }
  }, [followedDevicesData]);

  useEffect(() => {
    const arr = userData?.singleUser.data as User[];
    if (arr && arr.length) {
      setUser(arr[0]);
    }
  }, [userData]);

  if (!user) return null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image style={styles.userIcon} source={{ uri: user.avatar }} />
          <View style={styles.userInfo}>
            <CustomText fontSize={20}>{user.username}</CustomText>
            <CustomText>{user.email}</CustomText>
            <View style={styles.userStatsContainer}>
              <Image
                style={styles.statsIcon}
                source={require("../../assets/images/starred.png")}
              />
              <CustomText>{starCount}</CustomText>
              <Image
                style={styles.statsIcon}
                source={require("../../assets/images/check.png")}
              />
              <CustomText>
                {user?.problemSolved ? user?.problemSolved.length : 0}
              </CustomText>
            </View>
          </View>
        </View>
        <DeviceCarousel
          devices={followedDevices}
          title={`Followed devices (${followedDevices.length})`}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  userContainer: {
    marginVertical: 30,
    display: "flex",
    flexDirection: "row",
  },
  userIcon: {
    width: "25%",
    aspectRatio: 1,
    borderRadius: 300,
    backgroundColor: "#C4C4C4",
  },
  userInfo: {
    marginStart: 10,
    alignItems: "flex-start",
  },
  userStatsContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  statsIcon: {
    width: 32,
    height: 32,
    marginStart: 10,
    marginEnd: 5,
  },
});

export default ProfileScreenTab;
