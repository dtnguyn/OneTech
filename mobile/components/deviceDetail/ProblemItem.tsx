import React, { useState } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeviceProblem } from "../../generated/graphql";
import CustomText from "../util/CustomText";
import StatsBox from "./StatsBox";
import moment from "moment";
import HTML from "react-native-render-html";
import { useFonts } from "expo-font";

interface Props {
  problem: DeviceProblem;
  starred: boolean;
  toggleStar: (problem: DeviceProblem) => void;
}

const ProblemItem: React.FC<Props> = ({ problem, starred, toggleStar }) => {
  const [starState, setStarState] = useState(starred);
  const [statsState, setStatsState] = useState({
    starsCount: problem.stars?.length ? problem.stars.length : 0,
    solutionsCount: problem.solutions?.length ? problem.solutions.length : 0,
  });

  const [fontsLoaded] = useFonts({
    MMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            source={{ uri: problem.author?.avatar }}
            style={styles.userIcon}
          />
          <StatsBox
            title="stars"
            value={statsState.starsCount}
            color="yellow"
          />
          <StatsBox
            title="solutions"
            value={statsState.solutionsCount}
            color="green"
          />
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
          <HTML
            source={{ html: problem.content }}
            contentWidth={50}
            baseFontStyle={{ fontFamily: "MMedium" }}
            computeEmbeddedMaxWidth={(width) => 300}
            containerStyle={{
              width: useWindowDimensions().width * 0.8,
              paddingEnd: 20,
              paddingBottom: 0,
              marginBottom: 30,
            }}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonIconContainer}
              onPress={() => {
                if (starState)
                  setStatsState({
                    ...statsState,
                    starsCount: statsState.starsCount - 1,
                  });
                else
                  setStatsState({
                    ...statsState,
                    starsCount: statsState.starsCount + 1,
                  });
                setStarState(!starState);
                toggleStar(problem);
              }}
            >
              <Image
                source={
                  starState
                    ? require("../../assets/images/starred.png")
                    : require("../../assets/images/star.png")
                }
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
    marginBottom: 10,
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
    backgroundColor: "#C4C4C4",
  },

  buttonsContainer: {
    position: "absolute",
    bottom: 0,
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
    backgroundColor: "#D1D1D1",
  },
});

export default ProblemItem;
