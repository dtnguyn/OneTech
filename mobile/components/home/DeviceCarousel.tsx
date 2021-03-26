import { HeaderTitle } from "@react-navigation/stack";
import React, { useState } from "react";
import { Dimensions, ListRenderItem, StyleSheet, View } from "react-native";
import Carousel, { AdditionalParallaxProps } from "react-native-snap-carousel";
import { SharedElement } from "react-navigation-shared-element";
import { Device } from "../../generated/graphql";
import { ScreenNavigationProp } from "../../utils/types";
import CustomText from "../util/CustomText";
import DeviceItem from "./DeviceItem";

interface Props {
  devices: Array<Device>;
  title: string;
  navigation: ScreenNavigationProp;
}

const DeviceCarousel: React.FC<Props> = ({ devices, title, navigation }) => {
  const SliderWidth = Dimensions.get("screen").width;
  const [activeIndex, setActivateIndex] = useState(0);

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
    return (
      <SharedElement id={item.id}>
        <DeviceItem
          device={item}
          moveToDetail={() => {
            navigation.push("Detail", {
              name: item.name,
              id: item.id,
              category: item.category,
            });
          }}
        />
      </SharedElement>
    );
  };

  return (
    <View style={styles.carouselBox}>
      <CustomText
        fontSize={18}
        fontFamily="MSemiBold"
        style={styles.carouselTitle}
      >
        {title}
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
