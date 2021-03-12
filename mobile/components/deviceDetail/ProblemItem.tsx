import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeviceProblem } from "../../generated/graphql";
import CustomText from "../util/CustomText";
import StatsBox from "./StatsBox";
import moment from "moment";

interface Props {
  problem: DeviceProblem;
}

const ProblemItem: React.FC<Props> = ({ problem }) => {
  console.log("problem: ", problem.title);

  return (
    <View style={{ width: "90%" }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            source={{ uri: problem.author?.avatar }}
            style={styles.userIcon}
          />
          <StatsBox title="stars" value={32} color="yellow" />
          <StatsBox title="solutions" value={32} color="green" />
        </View>
        <View style={styles.right}>
          <CustomText
            fontFamily="MSemiBold"
            style={{ color: "#E35427" }}
            fontSize={18}
          >
            {problem.title}
          </CustomText>
          <CustomText fontFamily="MLight">
            {moment(problem.createdAt).format("LL")}
          </CustomText>
          <CustomText style={{ marginTop: 8 }}>{problem.content}</CustomText>
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
