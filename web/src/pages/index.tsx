import Body from "../components/Landing/LandingBody";
import Footer from "../components/Landing/LandingFooter";
import Header from "../components/Landing/LandingHeader";
import styles from "../styles/Landing.module.css";

export default function Home() {
  return (
    <div className={styles.landingContainer}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
