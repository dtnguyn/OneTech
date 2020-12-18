import React, { useState, createContext, useContext } from "react";
import { Device } from "../generated/graphql";

export type DeviceContextType = {
  devices: Array<Device>;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
};

export const DeviceContext = createContext<DeviceContextType>({
  devices: [],
  setDevices: (devices) => console.log("no device provider"),
});
export const useDevice = () => useContext(DeviceContext);
