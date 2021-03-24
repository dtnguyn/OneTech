import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomText from "../util/CustomText";

interface Props {
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

const AuthButton: React.FC<Props> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.authButton} onPress={onPress}>
      <Image source={icon} style={styles.authIcon} />
      <CustomText style={{ color: "#000" }}>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  authButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#E0E0E0",
    height: 70,
    elevation: 4,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
  },
  authIcon: {
    width: 36,
    height: 36,
    marginEnd: 10,
    resizeMode: "contain",
  },
});

export default AuthButton;
