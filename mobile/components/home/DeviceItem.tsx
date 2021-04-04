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
import { SharedElement } from "react-navigation-shared-element";
import FastImage from "react-native-fast-image";

interface Props {
  device: Device;
  moveToDetail: () => void;
}

const DeviceItem: React.FC<Props> = ({ device, moveToDetail }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={moveToDetail}
    >
      <SharedElement id={device.id}>
        <FastImage
          source={{
            uri: device.coverImage,
          }}
          style={styles.deviceImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      </SharedElement>

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
  },
});

export default DeviceItem;
