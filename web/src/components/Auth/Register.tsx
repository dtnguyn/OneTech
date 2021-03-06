import AuthButton from "./AuthButton";
import styles from "../../styles/Auth.module.css";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import IsEmail from "isemail";
import { useAlert } from "react-alert";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { error: alert } = useAlert();
  const router = useRouter();

  const handleEmailInputChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setEmail(event.target.value);
  };

  const onRegisterClick = (method: string) => {
    if (!IsEmail.validate(email)) {
      setError(true);
      return;
    } else setError(false);
    switch (method) {
      case "google": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
          query: { email, method: "google" },
        });

        break;
      }

      case "facebook": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
          query: { email, method: "facebook" },
        });
        break;
      }

      case "twitter": {
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
          query: { email, method: "twitter" },
        });
        break;
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h3 className={styles.authTitle}>Wanna sign up? Easy!!</h3>
      <text className={error ? styles.stepTextError : styles.stepText}>
        Step 1: Tell us your email *
      </text>

      <input
        placeholder="Enter your email..."
        onChange={handleEmailInputChange}
      />

      <p className={styles.stepText}>
        Step 2: Choose your preferred login method
      </p>
      <AuthButton
        logoSrc="./images/google.png"
        text="Sign up with Google"
        onClick={() => onRegisterClick("google")}
      />
      <AuthButton
        logoSrc="./images/facebook.png"
        text="Sign up with Facebook"
        onClick={() => onRegisterClick("facebook")}
      />
      <AuthButton
        logoSrc="./images/twitter.png"
        text="Sign up with Twitter"
        onClick={() => onRegisterClick("twitter")}
      />
    </div>
  );
};

export default Register;
