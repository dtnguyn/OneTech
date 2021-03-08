import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../util/CustomText";

interface Props {
  title: string;
}

const AutoComplete: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <CustomText>{title}</CustomText>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    alignSelf: "stretch",
    marginVertical: 15,
  },
  divider: {
    marginTop: 10,
    width: "100%",
    height: 0.3,
    backgroundColor: "#000",
  },
});

export default AutoComplete;
