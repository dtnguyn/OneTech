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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Device } from "../../generated/graphql";
import CustomText from "../util/CustomText";

interface Props {
  device: Device;
  moveToDetail: () => void;
}

const DeviceItem: React.FC<Props> = ({ device, moveToDetail }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={moveToDetail}>
      <Image
        source={{
          uri: device.coverImage,
        }}
        style={styles.deviceImage}
      />
      <CustomText>{device.name}</CustomText>
    </TouchableOpacity>
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
