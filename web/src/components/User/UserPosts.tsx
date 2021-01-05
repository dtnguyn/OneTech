import { stat } from "fs";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import {
  DeviceProblem,
  Solution,
  useProblemsQuery,
  useReviewsQuery,
  useSolutionsQuery,
} from "../../generated/graphql";
import { client } from "../../utils/withApollo";

import Switcher from "../Switcher";
import Problems from "./UserProblems";

import styles from "../../styles/User.module.css";
import Solutions from "./UserSolutions";

interface UserPostsProps {}

const UserPosts: React.FC<UserPostsProps> = ({}) => {
  const { user } = useAuth();

  const [switchState, setSwitchState] = useState<string>("problems");
  const [editing, setEditing] = useState(false);

  const [problems, setProblems] = useState<DeviceProblem[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  const { data: problemsData } = useProblemsQuery({
    variables: {
      authorId: user?.id,
    },
  });

  const { data: solutionsData } = useSolutionsQuery({
    variables: {
      userId: user?.id,
    },
  });

  useEffect(() => {
    const arr = problemsData?.problems?.data as DeviceProblem[];
    if (arr) {
      setProblems(arr);
    }
  }, [problemsData]);

  useEffect(() => {
    const arr = solutionsData?.solutions.data as Solution[];
    if (arr) {
      setSolutions(arr);
    }
  }, [solutionsData]);

  return (
    <div className={styles.userPostsContainer}>
      <h4 className={styles.userPostsTitle}>Your posts</h4>
      {!editing ? (
        <Switcher
          switchStateArr={["Problems", "Solutions"]}
          switchState={switchState}
          setSwitchState={setSwitchState}
        />
      ) : null}

      {switchState === "problems" ? (
        <Problems
          problems={problems}
          editing={editing}
          setEditing={(status) => setEditing(status)}
        />
      ) : (
        <Solutions
          solutions={solutions}
          editing={editing}
          setEditing={(status) => setEditing(status)}
        />
      )}
    </div>
  );
};

export default UserPosts;
