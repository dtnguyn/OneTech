import React from "react";
import { Image, StyleSheet, View } from "react-native";
import HTML from "react-native-render-html";
import { useTheme } from "../../context/ThemeContext";
import CustomText from "./CustomText";

interface Props {
  title?: string;
  content?: string;
}

const EmptyPlaceholder: React.FC<Props> = ({ title, content }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* For some reason, this line of code fix the flickering issue with react-native tab view */}
      <HTML source={{ html: " " }} />

      <CustomText>{title ? title : `No posts yet!`}</CustomText>
      <CustomText>
        {content ? content : `Be the first one to post something.`}
      </CustomText>
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
    marginTop: 50,
  },
  image: {
    marginTop: 30,
    width: 80,
    height: 80,
  },
});

export default EmptyPlaceholder;
