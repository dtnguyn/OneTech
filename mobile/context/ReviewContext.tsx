import React, { createContext, useContext } from "react";
import { Review } from "../generated/graphql";

export type ReviewContextType = {
  reviews: Array<Review> | null;
  setReviews: React.Dispatch<React.SetStateAction<Array<Review>>>;
};

export const ReviewContext = createContext<ReviewContextType>({
  reviews: null,
  setReviews: (_) => {},
});

export const useReviews = () => useContext(ReviewContext);
