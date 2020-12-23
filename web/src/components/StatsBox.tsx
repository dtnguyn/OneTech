import styles from "../styles/StatsBox.module.css";

interface StatsBoxProps {
  color: string;
  number: number;
  title: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ color, title, number }) => {
  return (
    <div
      className={styles.statsBoxContainer}
      style={{
        backgroundColor: color === "yellow" ? "#eef227" : "#62d67b",
      }}
    >
      <div className={styles.statsBoxNumber}>{number}</div>
      <div className={styles.statsBoxTitle}>{title}</div>
    </div>
  );
};

export default StatsBox;
