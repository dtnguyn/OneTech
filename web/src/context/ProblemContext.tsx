import React, { createContext, useContext } from "react";
import { DeviceProblem } from "../generated/graphql";

export type ProblemContextType = {
  problems: DeviceProblem[];
  setProblems: React.Dispatch<React.SetStateAction<DeviceProblem[]>>;
};

export const ProblemContext = createContext<ProblemContextType>({
  problems: [],
  setProblems: (_) => console.log("no problems provider"),
});
export const useProblem = () => useContext(ProblemContext);
