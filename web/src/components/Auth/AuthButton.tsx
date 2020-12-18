import styles from "../../styles/Auth.module.css";

interface Props {
  logoSrc: string;
  text: string;
  onClick: () => void;
}

const AuthButton: React.FC<Props> = ({ logoSrc, text, onClick }) => {
  return (
    <div className={styles.authButton} onClick={onClick}>
      <img className={styles.logoSmall} src={logoSrc} />
      <p>{text}</p>
    </div>
  );
};

export default AuthButton;
