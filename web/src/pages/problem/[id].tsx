import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Problem from "../../components/ProblemDetail/Problem";
import {
  DeviceProblem,
  Solution,
  useProblemDetailQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import styles from "../../styles/ProblemDetail.module.css";
import Solutions from "../../components/ProblemDetail/Solutions";
import { useAlert } from "react-alert";
interface ProblemDetailProps {}

const ProblemDetail: React.FC<ProblemDetailProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const [problem, setProblem] = useState<DeviceProblem>();
  const [solutions, setSolutions] = useState<Solution[]>();
  const { error: alert } = useAlert();
  const { data, loading, error } = useProblemDetailQuery({
    variables: {
      id: id as string,
    },
  });

  useEffect(() => {
    const arr = data?.singleProblem.data as DeviceProblem[];
    if (arr && arr.length === 1) {
      const prob = arr[0];
      setProblem(arr[0]);

      if (prob.solutions) {
        setSolutions(prob.solutions);
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error?.message);
    }
  }, [error]);

  if (!problem || !solutions) return null;

  return (
    <div className={styles.problemDetailPageContainer}>
      <Problem problem={problem} />
      <Solutions
        solutions={solutions}
        problemId={problem.id}
        problemAuthorId={problem.author!.id}
      />
    </div>
  );
};

export default withApollo({ ssr: true })(ProblemDetail);
