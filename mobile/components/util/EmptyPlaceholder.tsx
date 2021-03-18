import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

interface Props {}

const EmptyPlaceholder: React.FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <CustomText>No posts yet!</CustomText>
      <CustomText>Be the first one to post something.</CustomText>
      <Image
        source={require("../../assets/images/empty.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 53,
    height: 53,
  },
});

export default EmptyPlaceholder;
