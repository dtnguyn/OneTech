import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import {
  DeviceProblem,
  Solution,
  useProblemsQuery,
  User,
  useSolutionsQuery,
} from "../../generated/graphql";
import styles from "../../styles/User.module.css";
import Switcher from "../Switcher";
import Problems from "./UserProblems";
import Solutions from "./UserSolutions";

interface UserPostsProps {
  user: User;
}

const UserPosts: React.FC<UserPostsProps> = ({ user }) => {
  const [switchState, setSwitchState] = useState<string>("problems");
  const [editing, setEditing] = useState(false);
  const { error: alert } = useAlert();
  const [problems, setProblems] = useState<DeviceProblem[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  const { data: problemsData, error: problemsError } = useProblemsQuery({
    variables: {
      authorId: user?.id,
    },
  });

  const { data: solutionsData, error: solutionsError } = useSolutionsQuery({
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

  useEffect(() => {
    if (problemsError) {
      alert(problemsError.message);
    }

    if (solutionsError) {
      alert(solutionsError.message);
    }
  }, [problemsError, solutionsError]);

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
          user={user}
          problems={problems}
          editing={editing}
          setEditing={(status) => setEditing(status)}
        />
      ) : (
        <Solutions
          user={user}
          solutions={solutions}
          editing={editing}
          setEditing={(status) => setEditing(status)}
        />
      )}
    </div>
  );
};

export default UserPosts;
