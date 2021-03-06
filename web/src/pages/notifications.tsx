import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import NotificationItem from "../components/Nottifications/NotificationItem";
import {
  Notification,
  useDeleteNotificationMutation,
  useNotificationsQuery,
  useSeenNotificationsMutation,
} from "../generated/graphql";
import styles from "../styles/Notifications.module.css";
import { withApollo } from "../utils/withApollo";
import socketIOClient from "socket.io-client";
import { useAuth } from "../context/AuthContext";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { error: alert } = useAlert();
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>();
  const { data, error, refetch } = useNotificationsQuery({
    variables: {},
  });
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
    const socket = socketIOClient(process.env.NEXT_PUBLIC_SERVER_URL as string);
    const arr = data?.notifications.data as Notification[];

    if (user) {
      socket.on(`notification:${user?.id}`, () => {
        refetch();
      });
    }
    if (arr) {
      setNotifications(arr);
    }
  }, [data, user]);

  useEffect(() => {
    seenNotificationsMutation({
      update: (cache) => {
        cache.evict({ fieldName: "notifications" });
      },
    })
      .then((response) => {
        if (!response.data?.seenNotifications.status) {
          throw new Error(response.data?.seenNotifications.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className={styles.notificationsPageContainer}>
      <p className={styles.notificationsPageTitle}>Notifications</p>
      <div className={styles.notificationsContainer}>
        {notifications?.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            handleDelete={handleDeleteNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default withApollo()(Notifications);
