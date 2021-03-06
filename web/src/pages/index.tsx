import Body from "../components/Landing/LandingBody";
import Footer from "../components/Landing/LandingFooter";
import Header from "../components/Landing/LandingHeader";
import styles from "../styles/Landing.module.css";
import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.landingContainer}>
      <Head>
        <title>OneTech</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
