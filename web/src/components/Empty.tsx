import styles from "../styles/Empty.module.css";

interface EmptyProps {
  secondLine?: boolean;
}

const Empty: React.FC<EmptyProps> = ({ secondLine }) => {
  return (
    <div className={styles.emptyContainer}>
      <p>No posts yet!</p>

      {secondLine === false ? null : <p>Be the first one to post something.</p>}
      <img className={styles.emptyIcon} src="/images/empty.png" />
    </div>
  );
};

export default Empty;
