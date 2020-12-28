import React, { createContext, useContext } from "react";
import { Review } from "../generated/graphql";

export type ReviewContextType = {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
};

export const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  setReviews: (_) => console.log("no review provider"),
});
export const useReview = () => useContext(ReviewContext);
