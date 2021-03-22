import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomSwitch from "../components/auth/CustomSwitch";
import SpecTable from "../components/deviceDetail/SpecTable";
import SpecTableRow from "../components/deviceDetail/SpecTableRow";
import {
  Device,
  ReviewRating,
  useDeviceDetailQuery,
  useDeviceRatingsQuery,
} from "../generated/graphql";

interface Props {
  // device: Device | undefined;
  // rating: ReviewRating | undefined;
  deviceId: string;
}

const SpecScreenTab: React.FC<Props> = ({ deviceId }) => {
  const [device, setDevice] = useState<Device>();
  const [rating, setRating] = useState<ReviewRating>();

  const { data, error } = useDeviceDetailQuery({
    variables: {
      id: deviceId as string,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: ratingData } = useDeviceRatingsQuery({
    variables: {
      deviceId,
    },
    fetchPolicy: "cache-and-network",
  });

  const [currentOption, setCurrentOption] = useState("Technical");

  useEffect(() => {
    const ratings = ratingData?.ratings?.data as ReviewRating[];
    if (ratings && ratings?.length === 1) {
      setRating(ratings[0]);
    }
  }, [ratingData]);

  useEffect(() => {
    const devices = data?.singleDevice?.data as Device[];
    if (devices && devices.length != 0) {
      setDevice(devices[0]);
    }
  }, [data]);

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
