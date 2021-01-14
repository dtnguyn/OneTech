import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import NotificationItem from "../components/Nottifications/NotificationItem";
import {
  Notification,
  useDeleteNotificationMutation,
  useNotificationsQuery,
} from "../generated/graphql";
import styles from "../styles/Notifications.module.css";
import { withApollo } from "../utils/withApollo";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { error: alert } = useAlert();

  const [notifications, setNotifications] = useState<Notification[]>();
  const { data } = useNotificationsQuery({
    variables: {},
  });
  const [deleteNotificationMutation, {}] = useDeleteNotificationMutation();

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
    }
  }, [data]);
  return (
    <div className={styles.notificationsPageContainer}>
      <p className={styles.notificationsPageTitle}>Notifications</p>
      <div className={styles.notificationsContainer}>
        {notifications?.map((notification) => (
          <NotificationItem
            notification={notification}
            handleDelete={handleDeleteNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default withApollo()(Notifications);
