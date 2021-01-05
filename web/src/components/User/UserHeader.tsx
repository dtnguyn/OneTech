import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/User.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { user } = useAuth();

  return (
    <div className={styles.userPageHeaderContainer}>
      <div className={styles.userPageHeaderContent}>
        <img className={styles.userPageAvatar} src={user?.avatar} />
        <div className={styles.userInfoContainer}>
          <h4 className={styles.userNameText}>{user?.username}</h4>
          <p>{user?.email}</p>
          <div className={styles.userIconInfoContainer}>
            <div className={styles.userIconInfo}>
              <img className={styles.userIcon} src="/images/starred.png" />
              <p>10</p>
            </div>
            <div className={styles.userIconInfo}>
              <img className={styles.userIcon} src="/images/check.png" />
              <p>10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
