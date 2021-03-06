import AuthButton from "./AuthButton";
import styles from "../../styles/Auth.module.css";
import router from "next/router";
import { useAlert } from "react-alert";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { error: alert } = useAlert();
  const onLoginClick = (method: string) => {
    switch (method) {
      case "google": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          query: { method: "google" },
        });

        break;
      }

      case "facebook": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          query: { method: "facebook" },
        });
        break;
      }

      case "twitter": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          query: { method: "twitter" },
        });
        break;
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h3 className={styles.authTitle}>Login</h3>
      <AuthButton
        logoSrc="./images/google.png"
        text="Login with Google"
        onClick={() => onLoginClick("google")}
      />
      <AuthButton
        logoSrc="./images/facebook.png"
        text="Login with Facebook"
        onClick={() => onLoginClick("facebook")}
      />
      <AuthButton
        logoSrc="./images/twitter.png"
        text="Login with Twitter"
        onClick={() => onLoginClick("twitter")}
      />
    </div>
  );
};

export default Login;
