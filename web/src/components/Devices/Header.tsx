import styles from "../../styles/Devices.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className={styles.headerContainer}>
      <h4 className={styles.headerTitle}>Find your devices</h4>
      <div className={styles.headerInputContainer}>
        <input
          className={styles.headerInput}
          placeholder="Search your device"
        />
        <img
          className={styles.headerInputIcon}
          src="./images/search-icon.svg"
        />
      </div>
      <div className={styles.deviceCategoryContainer}>
        <div className={styles.deviceCategoryIconContainer}>
          <img
            className={styles.deviceCategoryIcon}
            src="./images/smartphone.svg"
          />
          <text>Phone</text>
        </div>
        <div className={styles.deviceCategoryIconContainer}>
          <img
            className={styles.deviceCategoryIcon}
            src="./images/laptop.svg"
          />
          <text>Laptop</text>
        </div>
        <div className={styles.deviceCategoryIconContainer}>
          <img className={styles.deviceCategoryIcon} src="./images/pc.svg" />
          <text>PC</text>
        </div>
      </div>
    </div>
  );
};

export default Header;
