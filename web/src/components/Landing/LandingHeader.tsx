import { useRouter } from "next/router";
import styles from "../../styles/Landing.module.css";
import { useDarkMode } from "next-dark-mode";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { darkModeActive } = useDarkMode();

  const router = useRouter();
  return (
    <div
      className={`row ${
        !darkModeActive
          ? styles.landingHeaderContainer
          : styles.landingHeaderDarkModeContainer
      }`}
    >
      <div
        className={`col-lg-7 col-md-12 ${styles.landingHeaderSectionContainer}`}
      >
        <div className={styles.landingHeaderSlogan}>
          <h1>Problem with your Tech</h1>
          <h1>We got Solutions</h1>
        </div>
        <div
          className={styles.landingHeaderButton}
          onClick={() => router.push("/device")}
        >
          Find your device
        </div>
      </div>
      <div
        className={`col-lg-5 col-md-12 ${styles.landingHeaderSectionContainer}`}
      >
        <img
          className={styles.landingHeaderIcon}
          src="/images/landing_icon.png"
        />
      </div>
    </div>
  );
};

export default Header;
