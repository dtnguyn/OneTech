import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {}

const SpecScreenTab: React.FC<Props> = ({}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SpecScreenTab;
