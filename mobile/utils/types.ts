import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Auth: undefined;
  Web: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Search"
>;

export type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Auth"
>;

export type WebScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Web"
>;
