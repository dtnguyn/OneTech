import moment from "moment";
import { Solution } from "../../generated/graphql";
import styles from "../../styles/ProblemDetail.module.css";
import StatsBox from "../StatsBox";
import parse from "html-react-parser";
import { Divider } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

interface SolutionItemProps {
  solution: Solution;
  starred: boolean;
  problemAuthorId?: string;
  accountPage?: boolean;
  handleDelete: (id: string, images: string[]) => void;
  handleEdit: (id: string, content: string) => void;
  handleToggleStar: (id: string) => void;
  handleTogglePicked?: (id: string, solverId: string) => void;
  handleReport: (id: string) => void;
}

const SolutionItem: React.FC<SolutionItemProps> = ({
  solution,
  starred,
  problemAuthorId,
  accountPage,
  handleToggleStar,
  handleTogglePicked,
  handleDelete,
  handleEdit,
  handleReport,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.solutionItemBox}>
      <div className={styles.solutionItemContainer}>
        <div className={styles.solutionInfoSection}>
          <div className={styles.solutionInfoContainer}>
            <StatsBox
              color="yellow"
              number={solution.stars ? solution.stars.length : 0}
              title="stars"
            />
            <br />

            {problemAuthorId && problemAuthorId === user?.id ? (
              <div
                className={styles.solutionButton}
                onClick={() => {
                  handleTogglePicked!(solution.id, solution.author.id);
                }}
              >
                <img
                  src={
                    solution.isPicked
                      ? `/images/uncheck.png`
                      : `/images/check.png`
                  }
                  className={styles.solutionButtonIcon}
                />
                <p>{solution.isPicked ? "Unpick" : "Pick"}</p>
              </div>
            ) : null}

            <div
              className={styles.solutionButton}
              onClick={() => {
                handleToggleStar(solution.id);
              }}
            >
              <img
                src={starred ? `/images/starred.png` : `/images/star.png`}
                className={styles.solutionButtonIcon}
              />
              <p>Star</p>
            </div>
            {user?.id === solution.author.id ? (
              <>
                <div
                  className={styles.solutionButton}
                  onClick={() => handleEdit(solution.id, solution.content)}
                >
                  <img
                    src="/images/pencil.png"
                    className={styles.solutionButtonIcon}
                  />
                  <p>Edit</p>
                </div>
                <div
                  className={styles.solutionButton}
                  onClick={() => {
                    const images: string[] = solution.images?.map((image) => {
                      return image.path;
                    });

                    handleDelete(solution.id, images ? images : []);
                  }}
                >
                  <img
                    src="/images/trash.png"
                    className={styles.solutionButtonIcon}
                  />
                  <p>Delete</p>
                </div>
              </>
            ) : null}

            <div
              className={styles.solutionButton}
              onClick={() => {
                handleReport(solution.id);
              }}
            >
              <img
                src="/images/flag.png"
                className={styles.solutionButtonIcon}
              />
              <p>Report</p>
            </div>
          </div>
        </div>
        <div className={styles.solutionPostSection}>
          <div
            className={styles.solutionHeaderContainer}
            onClick={() => router.push(`/user/${solution.author.id}`)}
          >
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
            {solution.isPicked ? (
              <img
                className={styles.solutionCheckIcon}
                src="/images/check.png"
              />
            ) : null}
          </div>
          <div className={styles.solutionContentContainer}>
            {accountPage ? (
              <p
                className="moreInfo"
                onClick={() => router.push(`/problem/${solution.problem.id}`)}
              >
                Problem: {solution.problem.title}
              </p>
            ) : null}
            {parse(solution.content)}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default SolutionItem;
