import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import styles from "../styles/Auth.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useDarkMode } from "next-dark-mode";
import Head from "next/head";

interface AuthProps {}

const Auth: React.FC<AuthProps> = ({}) => {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const { user } = useAuth();
  const router = useRouter();
  const { darkModeActive } = useDarkMode();

  if (user) {
    router.push("/");
    return null;
  }
  return (
    <div className={styles.authPageContainer}>
      <Head>
        <title>Authentication</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <div
          className={
            !darkModeActive
              ? styles.authContainer
              : styles.authDarkModeContainer
          }
        >
          <div className={styles.authSwitch}>
            <div
              className={
                isRegister
                  ? styles.loginSwitchContainer
                  : styles.loginSwitchContainerPicked
              }
              onClick={() => setIsRegister(false)}
            >
              Login
            </div>
            <div
              className={
                isRegister
                  ? styles.registerSwitchContainerPicked
                  : styles.registerSwitchContainer
              }
              onClick={() => setIsRegister(true)}
            >
              Sign up
            </div>
          </div>
          {isRegister ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
