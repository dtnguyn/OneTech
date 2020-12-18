import AuthButton from "./AuthButton";
import styles from "../../styles/Auth.module.css";
import router from "next/router";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const onLoginClick = (method: string) => {
    switch (method) {
      case "google": {
        router
          .push({
            pathname: "http://localhost:4000/auth/login",
            query: { method: "google" },
          })
          .then((response) => {
            console.log(response);
          });
        break;
      }

      case "facebook": {
        router.push({
          pathname: "http://localhost:4000/auth/login",
          query: { method: "facebook" },
        });
        break;
      }

      case "twitter": {
        router.push({
          pathname: "http://localhost:4000/auth/login",
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
        onClick={() => onLoginClick("google")}
      />
      <AuthButton
        logoSrc="./images/twitter.png"
        text="Login with Twitter"
        onClick={() => onLoginClick("google")}
      />
    </div>
  );
};

export default Login;
