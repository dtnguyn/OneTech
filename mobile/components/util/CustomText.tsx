import React, { useEffect } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useFonts } from "expo-font";
import { useTheme } from "../../context/ThemeContext";

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
  const { theme } = useTheme();

  return (
    <Text
      style={{
        color: theme === "light" ? "#000" : "#fafafa",
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
