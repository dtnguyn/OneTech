import React, { useState, createContext, useContext } from "react";
import { Device, User } from "../generated/graphql";

export type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: (_) => {},
});

export const useTheme = () => useContext(ThemeContext);
