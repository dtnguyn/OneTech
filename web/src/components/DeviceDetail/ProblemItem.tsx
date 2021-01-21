import { Avatar, Divider } from "@material-ui/core";
import { DeviceProblem } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import StatsBox from "../StatsBox";
import moment from "moment";
import parse from "html-react-parser";
import classes from "@material-ui/styles";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { clearInterval } from "timers";
import React from "react";
import { ReadMore } from "react-read-more";

interface ProblemItemProps {
  problem: DeviceProblem;
  starred: boolean;
  accountPage?: boolean;
  handleToggleStar: (problem: DeviceProblem) => void;
  handleDelete: (problemId: string, images: string[]) => void;
  handleEdit: (problemId: string) => void;
  handleReport: (id: string) => void;
}

const ProblemItem: React.FC<ProblemItemProps> = ({
  problem,
  starred,
  accountPage,
  handleToggleStar,
  handleDelete,
  handleEdit,
  handleReport,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div>
      <div className={styles.problemItemContainer}>
        <div className={styles.problemItemStatsContainer}>
          <img
            src={problem.author?.avatar}
            className={styles.postAvatar}
            onClick={() => router.push(`/user/${problem.author?.id}`)}
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
          <h4
            className={styles.problemItemTitle}
            onClick={() => router.push(`/problem/${problem.id}`)}
          >
            {problem.title}
          </h4>
          <p className={styles.postDate}>
            {moment(problem.createdAt).format("LL")}
          </p>

          <div className={styles.problemItemContent}>
            {accountPage ? (
              <p
                className="moreInfo"
                onClick={() => router.push(`/device/${problem.device.id}`)}
              >
                Device: {problem.device.name}
              </p>
            ) : null}

            {parse(problem.content)}
          </div>

          <div className={styles.postItemButtonsContainer}>
            <img
              src={starred ? `/images/starred.png` : `/images/star.png`}
              className={styles.postItemButton}
              onClick={() => {
                handleToggleStar(problem);
              }}
            />

            <img
              src="/images/flag.png"
              className={styles.postItemButton}
              onClick={() => {
                handleReport(problem.id);
              }}
            />
            {user?.id === problem.author?.id ? (
              <div>
                <img
                  src="/images/trash.png"
                  className={styles.postItemButton}
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
                  className={styles.postItemButton}
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
      <div className="divider" />
      <br />
    </div>
  );
};

export default ProblemItem;
