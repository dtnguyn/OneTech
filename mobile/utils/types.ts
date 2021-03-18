import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReviewRating } from "../generated/graphql";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Auth: undefined;
  Web: undefined;
  Detail: { name: string; id: string };
  Solution: { problemId: string };
  Compose: {
    header: string;
    title: string;
    content: string;
    rating?: ReviewRating;
    category: string;
    onCompose: (
      title: string,
      content: string,
      rating: ReviewRating | null | undefined,
      images: string[]
    ) => void;
  };
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
export type ComposeRouteProp = RouteProp<RootStackParamList, "Compose">;
export type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;
export type SolutionRouteProp = RouteProp<RootStackParamList, "Solution">;

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
