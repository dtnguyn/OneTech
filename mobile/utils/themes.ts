import { DarkTheme, Theme } from "@react-navigation/native";

export const CustomDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "#FAFAFA",
  },
};
