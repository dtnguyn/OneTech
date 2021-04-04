import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../components/util/CustomText";
import { useAuth } from "../context/AuthContext";
import {
  Device,
  useDeviceDetailQuery,
  useToggleDeviceFollowMutation,
} from "../generated/graphql";
import FastImage from "react-native-fast-image";
import CustomImage from "../components/util/CustomImage";
import WebView from "react-native-webview";

import { SharedElement } from "react-navigation-shared-element";

interface Props {
  deviceId: string;
}

const GeneralScreenTab: React.FC<Props> = ({ deviceId }) => {
  const [device, setDevice] = useState<Device>();
  const [followed, setFollowed] = useState(false);
  const { user } = useAuth();
  const [toggleDeviceFollowMutation, {}] = useToggleDeviceFollowMutation();

  const { data, error } = useDeviceDetailQuery({
    variables: {
      id: deviceId as string,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleToggleFollowDevice = async (deviceId: string, userId: string) => {
    setFollowed(!followed);
    await toggleDeviceFollowMutation({
      variables: {
        deviceId,
        userId,
      },
    })
      .then((res) => {
        if (!res.data?.toggleDeviceFollow.status) {
          throw Error(res.data?.toggleDeviceFollow.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    if (!user) {
      setFollowed(false);
      return;
    }
    if (!device) return;
    for (const follower of device?.followers!) {
      if (follower.userId === user.id) {
        setFollowed(true);
        return;
      }
    }
    setFollowed(false);
  }, [user, device]);

  useEffect(() => {
    const devices = data?.singleDevice?.data as Device[];
    if (devices && devices.length != 0) {
      setDevice(devices[0]);
    }
  }, [data]);

  if (!device) return null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <SharedElement id={device.id}>
          <FastImage
            source={{ uri: device.coverImage }}
            style={styles.deviceImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </SharedElement>

        <CustomText style={styles.priceText}>Org at: $1099</CustomText>
        <TouchableOpacity style={styles.buyButton}>
          <CustomText>Buy</CustomText>
          <Image
            source={require("../assets/images/cart.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.followButton,
            backgroundColor: followed ? "#6C757D" : "#A8D8AD",
          }}
          onPress={() => {
            if (!user) return;
            handleToggleFollowDevice(device.id, user!.id);
          }}
        >
          <CustomText>{followed ? `Unfollow` : "Follow"}</CustomText>
          <Image
            source={require("../assets/images/add.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deviceImage: {
    width: 380,
    height: 380,
    marginBottom: 5,
  },
  priceText: {
    marginBottom: 20,
  },

  buyButton: {
    width: 250,
    height: 60,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "#257CFE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  followButton: {
    width: 250,
    height: 60,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 10,
  },
});

export default React.memo(GeneralScreenTab);
