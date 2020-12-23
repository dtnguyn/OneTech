import { Divider } from "@material-ui/core";
import { DeviceProblem } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import StatsBox from "../StatsBox";
import moment from "moment";
import { useEffect, useState } from "react";

interface ProblemItemProps {
  problem: DeviceProblem;
  starred: boolean;
  handleToggleStar: (problem: DeviceProblem, isStarred: boolean) => void;
}

const ProblemItem: React.FC<ProblemItemProps> = ({
  problem,
  starred,
  handleToggleStar,
}) => {
  //const [starState, setStarState] = useState<boolean>();

  useEffect(() => {
    // console.log(starred);
    // setStarState(starred);
  }, []);

  return (
    <div>
      <div className={styles.problemItemContainer}>
        <div className={styles.problemItemStatsContainer}>
          <StatsBox
            number={problem.stars?.length ? problem.stars.length : 0}
            title="stars"
            color="yellow"
          />
          <StatsBox
            number={problem.solutions?.length ? problem.solutions.length : 0}
            title="solutions"
            color="green"
          />
        </div>

        <div className={styles.problemItemPostContainer}>
          <h4 className={styles.problemItemTitle}>{problem.title}</h4>
          <p className={styles.problemItemDate}>
            {moment(problem.createdAt).format("LL")}
          </p>
          <p className={styles.problemItemContent}>{problem.content}</p>

          <div className={styles.problemItemButtonsContainer}>
            <img
              src={starred ? `/images/starred.png` : `/images/star.png`}
              className={styles.problemItemButton}
              onClick={() => {
                console.log("starState: ", starred);
                handleToggleStar(problem, starred);
              }}
            />

            <img src="/images/flag.png" className={styles.problemItemButton} />
          </div>
        </div>
      </div>
      <br />
      <Divider />
      <br />
    </div>
  );
};

export default ProblemItem;
