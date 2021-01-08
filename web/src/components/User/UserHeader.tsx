import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/User.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { user } = useAuth();
  const [starCount, setStarCount] = useState<number>();

  useEffect(() => {
    let count = 0;
    console.log(user);
    if (user?.problems && user.solutions) {
      for (const problem of user?.problems!) {
        count += problem.stars?.length!;
      }
      for (const solution of user?.solutions!) {
        count += solution.stars?.length!;
      }
    }

    setStarCount(count);
  }, [user]);

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
              <p>{starCount}</p>
            </div>
            <div className={styles.userIconInfo}>
              <img className={styles.userIcon} src="/images/check.png" />
              <p>{user?.problemSolved?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
