import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import NotificationItem from "../../components/account/NotificationItem";
import { Notification, useNotificationsQuery } from "../../generated/graphql";

interface Props {}

const NotificationsScreen: React.FC<Props> = ({}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data, error, refetch } = useNotificationsQuery({
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  const renderNotificationItem: ListRenderItem<Notification> = ({ item }) => {
    return <NotificationItem notification={item} />;
  };

  useEffect(() => {
    const arr = data?.notifications.data as Notification[];
    if (arr) {
      setNotifications(arr);
    } else setNotifications([]);
  }, [data]);

  return <FlatList data={notifications} renderItem={renderNotificationItem} />;
};

export default NotificationsScreen;
