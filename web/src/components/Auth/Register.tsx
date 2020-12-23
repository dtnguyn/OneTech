import AuthButton from "./AuthButton";
import styles from "../../styles/Auth.module.css";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import IsEmail from "isemail";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const handleEmailInputChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const onRegisterClick = (method: string) => {
    if (!IsEmail.validate(email)) {
      setError(true);
      return;
    } else setError(false);
    switch (method) {
      case "google": {
        router
          .push({
            pathname: "http://localhost:4000/auth/register",
            query: { email, method: "google" },
          })
          .then((response) => {
            console.log(response);
          });
        break;
      }

      case "facebook": {
        router.push({
          pathname: "http://localhost:4000/auth/register",
          query: { email, method: "facebook" },
        });
        break;
      }

      case "twitter": {
        router.push({
          pathname: "http://localhost:4000/auth/register",
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