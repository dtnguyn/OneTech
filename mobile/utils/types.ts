import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Auth: undefined;
  Web: undefined;
  Detail: { name: string; id: string };
  Compose: {
    header: string;
    title: string;
    content: string;
    onCompose: (title: string, content: string, images: string[]) => void;
  };
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
export type ComposeRouteProp = RouteProp<RootStackParamList, "Compose">;
export type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;
