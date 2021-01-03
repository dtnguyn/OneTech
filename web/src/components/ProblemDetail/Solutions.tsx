import { Solution } from "../../generated/graphql";
import SolutionItem from "./SolutionItem";
import styles from "../../styles/ProblemDetail.module.css";

interface SolutionsProps {
  solutions: Solution[];
}

const Solutions: React.FC<SolutionsProps> = ({ solutions }) => {
  return (
    <div className={styles.solutionsContainer}>
      <h4 className={styles.solutionsTitle}>Solutions</h4>
      {solutions.map((solution) => (
        <SolutionItem solution={solution} />
      ))}
    </div>
  );
};

export default Solutions;
