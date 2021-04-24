import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import NotificationItem from "../../components/account/NotificationItem";
import EmptyPlaceholder from "../../components/util/EmptyPlaceholder";
import {
  Notification,
  useDeleteNotificationMutation,
  useNotificationsQuery,
  useSeenNotificationsMutation,
} from "../../generated/graphql";

interface Props {}

const NotificationsScreen: React.FC<Props> = ({}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data, error, refetch } = useNotificationsQuery({
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  const renderNotificationItem: ListRenderItem<Notification> = ({ item }) => {
    return (
      <NotificationItem
        notification={item}
        deleteNotification={handleDeleteNotification}
      />
    );
  };

  const [deleteNotificationMutation, {}] = useDeleteNotificationMutation();

  const [seenNotificationsMutation, {}] = useSeenNotificationsMutation();

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotificationMutation({
        variables: {
          id,
        },
        update: (cache) => {
          cache.evict({ fieldName: "notifications" });
        },
      }).then((res) => {
        if (!res.data?.deleteNotification.status) {
          throw new Error(res.data?.deleteNotification.message);
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const arr = data?.notifications.data as Notification[];
    if (arr) {
      setNotifications(arr);
      seenNotificationsMutation()
        .then((response) => {
          if (!response.data?.seenNotifications.status) {
            throw new Error(response.data?.seenNotifications.message);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else setNotifications([]);
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  if (!notifications.length)
    return (
      <EmptyPlaceholder title="Empty!" content="You have no notifications!" />
    );
  return <FlatList data={notifications} renderItem={renderNotificationItem} />;
};

export default NotificationsScreen;
