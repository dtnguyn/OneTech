import { useState } from "react";
import Login from "../components/Auth/Login";
import NavBar from "../components/Auth/NavBar";
import Register from "../components/Auth/Register";
import styles from "../styles/Auth.module.css";

interface AuthProps {}

const Auth: React.FC<AuthProps> = ({}) => {
  const [isRegister, setIsRegister] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.authContainer}>
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
  );
};

export default Auth;
