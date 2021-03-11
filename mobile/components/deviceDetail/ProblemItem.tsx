import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../util/CustomText";
import StatsBox from "./StatsBox";

interface Props {}

const ProblemItem: React.FC<Props> = ({}) => {
  return (
    <View style={{ width: "90%" }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.userIcon} />
          <StatsBox title="stars" value={32} color="yellow" />
          <StatsBox title="solutions" value={32} color="green" />
        </View>
        <View style={styles.right}>
          <CustomText
            fontFamily="MSemiBold"
            style={{ color: "#E35427" }}
            fontSize={18}
          >
            Why my iPhone 12 Pro Max doesn’t boot
          </CustomText>
          <CustomText fontFamily="MLight">May 25, 2020</CustomText>
          <CustomText style={{ marginTop: 8 }}>
            I dropped my phone the other day and I couldn’t turn on anymore. The
            screen is still intact and show damage externally...
          </CustomText>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonIconContainer}>
              <Image
                source={require("../../assets/images/star.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonIconContainer}>
              <Image
                source={require("../../assets/images/flag.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  left: {
    flex: 1,
    alignItems: "center",
  },
  right: {
    flex: 4.5,
    marginStart: 10,
  },
  userIcon: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 300,
    marginBottom: 10,
    resizeMode: "cover",
    backgroundColor: "#C4C4C4",
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttonIconContainer: {
    marginTop: 10,
    marginEnd: 15,
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
  divider: {
    width: "100%",
    height: 1,
    marginTop: 20,
    backgroundColor: "#D1D1D1",
  },
});

export default ProblemItem;
