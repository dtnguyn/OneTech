import ProblemItem from "./ProblemItem";

import styles from "../../styles/DeviceDetail.module.css";
import {
  DeviceProblem,
  DeviceProblemStar,
  useToggleProblemStarMutation,
} from "../../generated/graphql";
import { useProblem } from "../../context/ProblemContext";
import { useAuth } from "../../context/AuthContext";

interface ProblemsProps {}

const Problems: React.FC<ProblemsProps> = ({}) => {
  const { problems, setProblems } = useProblem();
  const { user } = useAuth();

  const [
    toggleProblemStarMutation,
    { data, loading, error },
  ] = useToggleProblemStarMutation();

  const isStarred = (stars: DeviceProblemStar[]) => {
    for (const star of stars) {
      if (star.userId === user?.id) {
        return true;
      }
    }
    return false;
  };

  const handleToggleProblemStar = async (
    problem: DeviceProblem,
    isStarred: boolean
  ) => {
    if (!user) return;
    await toggleProblemStarMutation({
      variables: {
        problemId: problem.id,
        userId: user!.id,
      },
    }).then((res) => {
      if (res.data?.toggleProblemStar.status) {
        const starred = !isStarred;
        setProblems(
          problems.map((_problem) => {
            if (problem.id === _problem.id) {
              if (starred) {
                //Add star
                console.log("Add star");
                return {
                  ..._problem,
                  stars: [
                    ..._problem.stars!,
                    {
                      userId: user.id,
                      problemId: _problem.id,
                    } as DeviceProblemStar,
                  ],
                };
              } else {
                //remove star
                console.log("Remove star");
                let index = -1;
                for (let i = 0; i < _problem.stars!.length; i++) {
                  if (_problem.stars![i].userId === user.id) {
                    index = i;
                    break;
                  }
                }
                _problem.stars!.splice(index, 1);
                return _problem;
              }
            }
            return _problem;
          })
        );
      }
    });
  };

  return (
    <div className={styles.problemsContainer}>
      {problems.map((problem) => {
        const starred = isStarred(problem.stars ? problem.stars : []);
        return (
          <ProblemItem
            starred={starred}
            key={problem.id}
            problem={problem}
            handleToggleStar={(problem, isStarred) =>
              handleToggleProblemStar(problem, isStarred)
            }
          />
        );
      })}
    </div>
  );
};

export default Problems;
