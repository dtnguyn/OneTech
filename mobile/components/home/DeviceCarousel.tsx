import { HeaderTitle } from "@react-navigation/stack";
import React, { useState } from "react";
import { Dimensions, ListRenderItem, StyleSheet, View } from "react-native";
import Carousel, { AdditionalParallaxProps } from "react-native-snap-carousel";
import { Device } from "../../generated/graphql";
import CustomText from "../util/CustomText";
import DeviceItem from "./DeviceItem";

interface Props {
  devices: Array<Device>;
}

const DeviceCarousel: React.FC<Props> = ({ devices }) => {
  const SliderWidth = Dimensions.get("screen").width;
  const [activeIndex, setActivateIndex] = useState(0);
  const [carouselState, setCarouselState] = useState([
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 2",
      text: "Text 2",
    },
    {
      title: "Item 3",
      text: "Text 3",
    },
    {
      title: "Item 4",
      text: "Text 4",
    },
    {
      title: "Item 5",
      text: "Text 5",
    },
  ]);

  const renderDevice: ListRenderItem<{
    title: string;
    text: string;
  }> &
    ((
      item: {
        item: Device;
        index: number;
      },
      parallaxProps?: AdditionalParallaxProps | undefined
    ) => React.ReactNode) = ({ item }: any) => {
    return <DeviceItem device={item} />;
  };

  return (
    <View style={styles.carouselBox}>
      <CustomText
        fontSize={18}
        fontFamily="MSemiBold"
        style={styles.carouselTitle}
      >
        {devices.length ? devices[0].brand : "No available device"}
      </CustomText>
      <Carousel
        layout={"default"}
        data={devices as any}
        sliderWidth={SliderWidth}
        itemWidth={300}
        containerCustomStyle={styles.carouselContainer}
        renderItem={renderDevice as any}
        activeSlideOffset={0}
        useScrollView
        onSnapToItem={(index) => setActivateIndex(index)}
        activeSlideAlignment="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselBox: {
    marginVertical: 15,
  },
  carouselTitle: {
    marginStart: 20,
  },
  carouselContainer: {},
});

export default DeviceCarousel;
