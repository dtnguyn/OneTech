import styles from "../../styles/Auth.module.css";
import { useDarkMode } from "next-dark-mode";

interface Props {
  logoSrc: string;
  text: string;
  onClick: () => void;
}

const AuthButton: React.FC<Props> = ({ logoSrc, text, onClick }) => {
  const { darkModeActive } = useDarkMode();

  return (
    <div
      className={
        !darkModeActive ? styles.authButton : styles.authButtonDarkMode
      }
      onClick={onClick}
    >
      <img className={styles.logoSmall} src={logoSrc} />
      {text}
    </div>
  );
};

export default AuthButton;
