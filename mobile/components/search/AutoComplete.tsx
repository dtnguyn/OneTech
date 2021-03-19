import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../util/CustomText";

interface Props {
  title: string;
  pressAction: (title: string) => void;
}

const AutoComplete: React.FC<Props> = ({ title, pressAction }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        containerStyle={{ width: "100%" }}
        onPress={() => pressAction(title)}
      >
        <CustomText>{title}</CustomText>
        <View style={styles.divider} />
      </TouchableOpacity>
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
