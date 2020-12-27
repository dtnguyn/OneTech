import { Avatar, Divider } from "@material-ui/core";
import { DeviceProblem } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import StatsBox from "../StatsBox";
import moment from "moment";
import parse from "html-react-parser";
import classes from "@material-ui/styles";
import { useAuth } from "../../context/AuthContext";

interface ProblemItemProps {
  problem: DeviceProblem;
  starred: boolean;
  handleToggleStar: (problem: DeviceProblem, isStarred: boolean) => void;
  handleDelete: (problemId: string, images: string[]) => void;
  handleEdit: (problemId: string) => void;
}

const ProblemItem: React.FC<ProblemItemProps> = ({
  problem,
  starred,
  handleToggleStar,
  handleDelete,
  handleEdit,
}) => {
  const { user } = useAuth();

  return (
    <div>
      <div className={styles.problemItemContainer}>
        <div className={styles.problemItemStatsContainer}>
          <img
            src={problem.author?.avatar}
            className={styles.problemItemAvatar}
          />

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
          <div className={styles.problemItemContent}>
            {parse(problem.content)}
          </div>

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
            {user?.id === problem.author?.id ? (
              <div>
                <img
                  src="/images/trash.png"
                  className={styles.problemItemButton}
                  onClick={() => {
                    const images = problem.images?.map((image) => {
                      return image.path;
                    });
                    console.log("images: ", images);
                    handleDelete(problem.id, images ? images : []);
                  }}
                />
                <img
                  src="/images/pencil.png"
                  className={styles.problemItemButton}
                  onClick={() => {
                    handleEdit(problem.id);
                  }}
                />
              </div>
            ) : null}
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
