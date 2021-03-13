import React, { createContext, useContext } from "react";
import { DeviceProblem, User } from "../generated/graphql";

export type ProblemContextType = {
  problems: Array<DeviceProblem> | null;
  setProblems: React.Dispatch<React.SetStateAction<Array<DeviceProblem>>>;
};

export const ProblemContext = createContext<ProblemContextType>({
  problems: null,
  setProblems: (_) => {},
});

export const useProblems = () => useContext(ProblemContext);
