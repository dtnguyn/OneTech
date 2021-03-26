import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

interface Props {
  title?: string;
  content?: string;
}

const PrivatePlaceHolder: React.FC<Props> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <CustomText>{title ? title : `Access denied!`}</CustomText>
      <CustomText>
        {content ? content : `You don't have access to this data`}
      </CustomText>
      <Image
        source={require("../../assets/images/private.png")}
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
    marginTop: 50,
  },
  image: {
    marginTop: 30,
    width: 80,
    height: 80,
  },
});

export default PrivatePlaceHolder;
