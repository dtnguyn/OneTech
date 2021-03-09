import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../components/util/CustomText";
import { useAuth } from "../context/AuthContext";
import { Device, useToggleDeviceFollowMutation } from "../generated/graphql";

interface Props {
  device: Device | undefined;
}

const GeneralScreenTab: React.FC<Props> = ({ device }) => {
  const [followed, setFollowed] = useState(false);
  const { user } = useAuth();
  const [toggleDeviceFollowMutation, {}] = useToggleDeviceFollowMutation();

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

  if (!device) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: device?.coverImage }} style={styles.deviceImage} />
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
    resizeMode: "contain",
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

export default GeneralScreenTab;
