import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "../util/CustomText";

interface Props {
  value: number;
  title: string;
  color: "green" | "yellow";
}

const StatsBox: React.FC<Props> = ({ title, value, color }) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: color === "green" ? "#62D67B" : "#EEF227",
      }}
    >
      <CustomText fontSize={13} style={{ color: "#000" }}>
        {value}
      </CustomText>
      <CustomText style={styles.text} fontSize={10}>
        {title}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    position: "absolute",
    bottom: 2,
    color: "#000",
  },
});

export default StatsBox;
