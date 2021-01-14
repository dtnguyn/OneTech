import { Notification } from "../../generated/graphql";
import styles from "../../styles/Notifications.module.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface NotificationItemProps {
  notification: Notification;
  handleDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  handleDelete,
}) => {
  const [icon, setIcon] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    switch (notification.category) {
      case "star":
        setIcon("/images/starred.png");
        break;
      case "pick":
        setIcon("/images/check.png");
        break;
      case "problem":
        setIcon("/images/problem.png");
        break;
      case "solution":
        setIcon("/images/solution.png");
        break;
    }
  }, []);

  return (
    <div className={styles.notificationIconBox}>
      <div className={styles.notificationItemContainer}>
        <div className={styles.notificationIconContainer}>
          <img className={styles.notificationIcon} src={icon} />
        </div>
        <div
          className={styles.notificationTextContainer}
          onClick={() => router.push(notification.link)}
        >
          <p className={styles.notificationItemTitle}>{notification.title}</p>
          <p className="date">{moment(notification.createdAt).format("LL")}</p>
          <p className={styles.notificationItemContent}>
            {notification.content}
          </p>
        </div>
      </div>
      <img
        className={styles.notificationDeleteIcon}
        src="/images/trash.png"
        onClick={() => handleDelete(notification.id)}
      />
      <div className="divider" />
    </div>
  );
};

export default NotificationItem;
