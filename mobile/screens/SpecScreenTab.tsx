import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomSwitch from "../components/auth/CustomSwitch";
import SpecTable from "../components/deviceDetail/SpecTable";
import SpecTableRow from "../components/deviceDetail/SpecTableRow";
import { Device, ReviewRating } from "../generated/graphql";

interface Props {
  device: Device | undefined;
  rating: ReviewRating | undefined;
}

const SpecScreenTab: React.FC<Props> = ({ device, rating }) => {
  const [currentOption, setCurrentOption] = useState("Technical");

  if (!device || !rating) return null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomSwitch
          options={["Technical", "Simplify", "Rating"]}
          currentOption={currentOption}
          changeOption={(option) => {
            setCurrentOption(option);
          }}
        />
        <SpecTable
          currentOption={currentOption}
          rating={rating}
          spec={device.spec}
          category={device.category}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});
export default SpecScreenTab;
