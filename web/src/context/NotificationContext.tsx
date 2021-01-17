import React, { useState, createContext, useContext } from "react";
import { Notification } from "../generated/graphql";

export type NotificationContextType = {
  notifications: Array<Notification>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
};

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: (_) => console.log("no notification provider"),
});
export const useNotification = () => useContext(NotificationContext);
