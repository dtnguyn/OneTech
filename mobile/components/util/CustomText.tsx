import React, { useEffect } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useFonts } from "expo-font";

interface Props {
  fontFamily?: string;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
}

const CustomText: React.FC<Props> = ({
  fontFamily,
  fontSize,
  style,
  children,
}) => {
  const [fontsLoaded] = useFonts({
    MLight: require("../../assets/fonts/Montserrat-Light.ttf"),
    MRegular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    MMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    MSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    MBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Text
      style={{
        ...(style as object),
        fontFamily: fontFamily ? fontFamily : "MMedium",
        fontSize: fontSize ? fontSize : 16,
      }}
    >
      {children}
    </Text>
  );
};

export default CustomText;
