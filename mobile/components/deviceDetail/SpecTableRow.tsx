import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../util/CustomText";

interface Props {
  title: string;
  content: React.ReactChild;
}

const SpecTableRow: React.FC<Props> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{title}</CustomText>

      <View style={styles.content}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  title: {
    flex: 2,
  },
  content: {
    flex: 4,
    alignSelf: "center",
  },
});

export default SpecTableRow;
