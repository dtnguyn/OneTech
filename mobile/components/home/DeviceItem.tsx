import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Device } from "../../generated/graphql";
import CustomText from "../util/CustomText";

interface Props {
  device: Device;
}

const DeviceItem: React.FC<Props> = ({ device }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: device.coverImage,
        }}
        style={styles.deviceImage}
      />
      <CustomText>{device.name}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  deviceImage: {
    width: 380,
    height: 380,
    resizeMode: "contain",
  },
});

export default DeviceItem;
