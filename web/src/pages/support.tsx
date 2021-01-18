import styles from "../styles/Support.module.css";
import CopyMailTo from "react-copy-mailto";

interface SupportProps {}

const SupportPage: React.FC<SupportProps> = ({}) => {
  return (
    <div className={styles.supportPageContainer}>
      <p className={styles.supportPageTitle}> Support</p>
      <p className={styles.supportPageContent}>
        If you want to ask us anything or tell us your experience, feedbacks or
        report a bug in the website, please don't hesitate to contact us with
        via email below!
      </p>
      <p className={styles.supportPageContent}>
        We will normally get back to you in one (sometimes 2) day.
      </p>
      <CopyMailTo
        email="support@onetech.com"
        anchorStyles={{
          fontSize: "1.5rem",
        }}
      />
    </div>
  );
};

export default SupportPage;
