import React, { useState, createContext, useContext } from "react";
import { Device, User } from "../generated/graphql";

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (_) => console.log("no user provider"),
});

export const useAuth = () => useContext(AuthContext);
