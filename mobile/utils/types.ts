import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReviewRating } from "../generated/graphql";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Auth: undefined;
  Web: { type: "login" | "register"; url: string };
  Detail: { name: string; id: string; category: string };
  Solution: { problemId: string; deviceId: string };
  Compose: {
    header: string;
    title: string | null;
    content: string;
    rating?: ReviewRating;
    category: string | null;
    onCompose: (
      title: string | null,
      content: string,
      rating: ReviewRating | null | undefined,
      images: string[]
    ) => void;
  };
  Account: { userId: string };
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
export type ComposeRouteProp = RouteProp<RootStackParamList, "Compose">;
export type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;
export type SolutionRouteProp = RouteProp<RootStackParamList, "Solution">;
export type AccountRouteProp = RouteProp<RootStackParamList, "Account">;
export type WebRouteProp = RouteProp<RootStackParamList, "Web">;

export type RatingValue = {
  overall: number;
  display: number;
  processor: number;
  battery: number;
  software: number;
  camera: number;
  gpu: number;
  memory: number;
  thermals: number;
  ports: number;
};
