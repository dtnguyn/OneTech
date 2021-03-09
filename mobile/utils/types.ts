import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Auth: undefined;
  Web: undefined;
  Detail: { name: string };
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// export type SearchScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Search"
// >;

// export type AuthScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Auth"
// >;

// export type WebScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Web"
// >;
