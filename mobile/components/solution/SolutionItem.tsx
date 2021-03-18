import moment from "moment";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import HTML from "react-native-render-html";
import { Solution } from "../../generated/graphql";
import StatsBox from "../deviceDetail/StatsBox";
import CustomText from "../util/CustomText";

interface Props {
  solution: Solution;
}

const SolutionItem: React.FC<Props> = ({ solution }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsBoxContainer}>
          <StatsBox value={160} title="stars" color="yellow" />
        </View>
        <Image
          source={{ uri: solution.author.avatar }}
          style={styles.userIcon}
        />
        <View style={styles.headerText}>
          <CustomText fontFamily="MSemiBold">
            {solution.author.username}
          </CustomText>
          <CustomText fontFamily="MLight">
            {moment(solution.createdAt).format("LL")}
          </CustomText>
        </View>
      </View>
      <HTML
        source={{ html: solution.content }}
        contentWidth={50}
        baseFontStyle={{ fontFamily: "MMedium" }}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonIconContainer} onPress={() => {}}>
          <Image
            source={require("../../assets/images/check.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIconContainer} onPress={() => {}}>
          <Image
            source={require("../../assets/images/star.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIconContainer} onPress={() => {}}>
          <Image
            source={require("../../assets/images/flag.png")}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIconContainer} onPress={() => {}}>
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
  },
  headerText: {
    marginStart: 10,
  },
  statsBoxContainer: {
    width: "18%",
  },
  userIcon: {
    width: "15%",
    aspectRatio: 1,
    marginStart: 10,
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
