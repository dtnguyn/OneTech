import moment from "moment";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import HTML from "react-native-render-html";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { DeviceProblem, Solution } from "../../generated/graphql";
import StatsBox from "../deviceDetail/StatsBox";
import CustomText from "../util/CustomText";

interface Props {
  solution: Solution;
  starred: boolean;
  goToAccount: (userId: string) => void;

  checkPost: ((solution: Solution) => void) | null;
  toggleStar: (solution: Solution) => void;
  updatePost: (solution: Solution) => void;
  deletePost: (solution: Solution, images: string[]) => void;
  reportPost: (solution: Solution) => void;
}

const SolutionItem: React.FC<Props> = ({
  solution,
  starred,
  goToAccount,
  checkPost,
  toggleStar,
  updatePost,
  deletePost,
  reportPost,
}) => {
  const [starState, setStarState] = useState(starred);
  const [statsState, setStatsState] = useState({
    starsCount: solution.stars?.length ? solution.stars.length : 0,
  });
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsBoxContainer}>
          <StatsBox
            value={solution.stars ? solution.stars.length : 0}
            title="stars"
            color="yellow"
          />
        </View>
        <TouchableOpacity
          style={styles.userIconContainer}
          onPress={() => {
            goToAccount(solution.author?.id!);
          }}
        >
          <Image
            source={{ uri: solution.author.avatar }}
            style={styles.userIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <CustomText fontFamily="MSemiBold">
            {solution.author.username}
          </CustomText>
          <CustomText fontFamily="MLight">
            {moment(solution.createdAt).format("LL")}
          </CustomText>
        </View>
        {solution.isPicked ? (
          <Image
            source={require("../../assets/images/check.png")}
            style={styles.checkIcon}
          />
        ) : null}
      </View>
      <View style={{ width: "100%" }}>
        <HTML
          source={{ html: solution.content }}
          contentWidth={50}
          baseFontStyle={{
            fontFamily: "MMedium",
            color: theme === "light" ? "#000" : "#fafafa",
          }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        {checkPost !== null ? (
          <TouchableOpacity
            style={styles.buttonIconContainer}
            onPress={() => checkPost(solution)}
          >
            <Image
              source={
                solution.isPicked
                  ? require("../../assets/images/uncheck.png")
                  : require("../../assets/images/check.png")
              }
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.buttonIconContainer}
          onPress={() => {
            if (!user) {
              alert("You have to log in first.");
              return;
            }
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
            toggleStar(solution);
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
        <TouchableOpacity
          style={styles.buttonIconContainer}
          onPress={() => reportPost(solution)}
        >
          <Image
            source={require("../../assets/images/flag.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonIconContainer}
          onPress={() => updatePost(solution)}
        >
          <Image
            source={require("../../assets/images/pencil.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonIconContainer}
          onPress={() => {
            const images = solution.images.map((solution) => {
              return solution.path;
            });
            deletePost(solution, images);
          }}
        >
          <Image
            source={require("../../assets/images/trash.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    marginStart: 10,
  },
  statsBoxContainer: {
    width: "15%",
  },
  userIconContainer: {
    width: "15%",
    aspectRatio: 1,
    marginStart: 10,
    borderRadius: 300,
    backgroundColor: "#C4C4C4",
  },
  userIcon: {
    width: "100%",
    height: "100%",
    borderRadius: 300,
  },
  checkIcon: {
    width: "10%",
    aspectRatio: 1,
    marginStart: "auto",
    borderRadius: 300,
    backgroundColor: "#C4C4C4",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  buttonIconContainer: {
    marginTop: 10,
    marginEnd: 15,
  },
  buttonIcon: {
    width: 28,
    height: 28,
  },
  divider: {
    marginTop: 10,
    width: "100%",
    height: 1,
    backgroundColor: "#c4c4c4",
  },
});

export default SolutionItem;
