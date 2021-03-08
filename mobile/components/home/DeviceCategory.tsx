import React, { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  category: string;
  currentCategory: string;
  icon: ImageSourcePropType;
  onClick: () => void;
}

const DeviceCategory: React.FC<Props> = ({
  category,
  icon,
  currentCategory,
  onClick,
}) => {
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    if (category === currentCategory) setPicked(true);
    else setPicked(false);
  }, [currentCategory]);

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: picked ? "#4699f2" : "#EFEFEF",
      }}
      onPress={onClick}
    >
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 53,
    height: 53,
    marginEnd: 10,
    backgroundColor: "#EFEFEF",
    borderRadius: 53,
  },
  containerPicked: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 53,
    height: 53,
    borderRadius: 53,
  },
  icon: {
    width: 34,
    height: 34,
  },
});

export default DeviceCategory;
