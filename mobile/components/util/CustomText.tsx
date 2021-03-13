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
