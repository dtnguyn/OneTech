import AuthButton from "./AuthButton";
import styles from "../../styles/Auth.module.css";
import router from "next/router";
import { useAlert } from "react-alert";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { error: alert } = useAlert();
  const onLoginClick = (method: string) => {
    // console.log(`${process.env.NEXT_PUBLIC_CLIENT_URL}`);
    // console.log(
    //   `${process.env.NEXT_PUBLIC_CLIENT_URL}/redirect/auth/login/error`
    // );

    switch (method) {
      case "google": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          query: {
            method: "google",
            redirect: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
            failureRedirect: `${process.env.NEXT_PUBLIC_CLIENT_URL}/redirect/auth/login/error`,
          },
        });

        break;
      }

      case "facebook": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          query: {
            method: "facebook",
            redirect: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
            failureRedirect: `${process.env.NEXT_PUBLIC_CLIENT_URL}/redirect/auth/login/error`,
          },
        });
        break;
      }

      case "twitter": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          query: {
            method: "twitter",
            redirect: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
            failureRedirect: `${process.env.NEXT_PUBLIC_CLIENT_URL}/redirect/auth/login/error`,
          },
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
