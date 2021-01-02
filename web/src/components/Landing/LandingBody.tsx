import styles from "../../styles/Landing.module.css";

interface BodyProps {}

const Body: React.FC<BodyProps> = ({}) => {
  return (
    <div className={styles.landingBodyContainer}>
      <h3 className={styles.landingBodyText}>
        Available on Android & iOS soon
      </h3>
      <div className={styles.landingBodyIconsContainer}>
        <img className={styles.landingBodyIcon} src="/images/app-store.png" />
        <img className={styles.landingBodyIcon} src="/images/google-play.png" />
      </div>
    </div>
  );
};

export default Body;
