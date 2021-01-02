import styles from "../../styles/Landing.module.css";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className={styles.landingFooterContainer}>
      <h3 className={styles.landingFooterTitle}>Our Goals</h3>
      <p className={styles.landingFooterText}>
        Our goal is to bring a better experience to people when using
        technology, whether it is a smartphone, laptop, or PC desktop. We want
        to more people to have access to technology
      </p>
    </div>
  );
};

export default Footer;
