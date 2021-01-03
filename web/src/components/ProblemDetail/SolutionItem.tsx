import moment from "moment";
import { Solution } from "../../generated/graphql";
import styles from "../../styles/ProblemDetail.module.css";
import StatsBox from "../StatsBox";

interface SolutionItemProps {
  solution: Solution;
}

const SolutionItem: React.FC<SolutionItemProps> = ({ solution }) => {
  return (
    <div className={styles.solutionItemContainer}>
      <div className={styles.solutionInfoSection}>
        <div className={styles.solutionInfoContainer}>
          <StatsBox
            color="yellow"
            number={solution.stars ? solution.stars.length : 0}
            title="stars"
          />
          <br />

          <div className={styles.solutionButton}>
            <img
              src="/images/check.png"
              className={styles.solutionButtonIcon}
            />
            <p>Pick</p>
          </div>
          <div className={styles.solutionButton}>
            <img
              src="/images/starred.png"
              className={styles.solutionButtonIcon}
            />
            <p>Star</p>
          </div>
          <div className={styles.solutionButton}>
            <img src="/images/flag.png" className={styles.solutionButtonIcon} />
            <p>Report</p>
          </div>
        </div>
      </div>
      <div className={styles.solutionPostSection}>
        <div className={styles.solutionHeaderContainer}>
          <img
            className={styles.solutionAuthorAvatar}
            src={solution.author.avatar}
          />
          <div className={styles.solutionHeaderTextContainer}>
            <p className={styles.solutionAuthorName}>
              {solution.author.username}
            </p>
            <p className={styles.solutionDateText}>
              {moment(solution.createdAt).format("LL")}
            </p>
          </div>
        </div>
        <div className={styles.solutionContentContainer}>
          {solution.content}
        </div>
      </div>
    </div>
  );
};

export default SolutionItem;
