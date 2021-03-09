import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Auth: undefined;
  Web: undefined;
  Detail: { name: string; id: string };
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
