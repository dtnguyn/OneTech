import { TextField } from "@material-ui/core";
import { StringValueNode } from "graphql";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useProblem } from "../../context/ProblemContext";
import { useReview } from "../../context/ReviewContext";
import {
  DeviceProblem,
  Review,
  useCreateProblemMutation,
  useProblemsQuery,
  useReviewsQuery,
} from "../../generated/graphql";
import device from "../../pages/device";
import styles from "../../styles/DeviceDetail.module.css";
import { client } from "../../utils/withApollo";
import ConfirmationDialog from "../ConfirmationDialog";
import CustomEditor from "../CustomEditor";
import SearchBar from "../SearchBar";
import Switcher from "../Switcher";
import Problems from "./Problems";
import Reviews from "./Reviews";

interface BodyProps {
  deviceId: string;
  deviceCategory: string;
}

const Body: React.FC<BodyProps> = ({ deviceId, deviceCategory }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [initialState, setInitialState] = useState({
    problems: true,
    reviews: true,
  });
  const { problems, setProblems } = useProblem();
  const { reviews, setReviews } = useReview();

  const [addingProblem, setAddingProblem] = useState<boolean>(false);
  const [editingProblem, setEditingProblem] = useState<boolean>(false);

  const [addingReview, setAddingReview] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<boolean>(false);

  const { user } = useAuth();

  const [switchState, setSwitchState] = useState<string>("problems");

  const { data: problemsData } = useProblemsQuery({
    variables: {
      deviceId,
      title: searchValue,
      content: searchValue,
    },
    client: client,
  });

  const { data: reviewsData } = useReviewsQuery({
    variables: {
      deviceId,
      title: searchValue,
      content: searchValue,
    },
    client: client,
  });

  let timeout: NodeJS.Timeout;
  const handleSearch: (event: ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    setInputValue(event.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchValue(event.target.value);
    }, 700);
  };

  useEffect(() => {
    const problemArr = problemsData?.problems?.data as DeviceProblem[];
    if (problemArr && problemArr.length != 0) {
      //found problems
      if (!initialState.problems) {
        setProblems(problemArr);
      }
      setInitialState({ ...initialState, problems: false });
    } else if (problemArr && problemArr.length == 0) {
      //not found
      setProblems([]);
    }
  }, [problemsData]);

  useEffect(() => {
    const reviewArr = reviewsData?.reviews?.data as Review[];
    console.log("review Array", reviewArr);
    if (reviewArr && reviewArr.length != 0) {
      //found reviews

      if (!initialState.reviews) {
        setReviews(reviewArr);
      }

      setInitialState({ ...initialState, reviews: false });
    } else if (reviewArr && reviewArr.length == 0) {
      //not found
      setReviews([]);
    }
  }, [reviewsData]);

  return (
    <div className={styles.deviceDetailBodyContainer}>
      {!addingProblem && !editingProblem && !addingReview && !editingReview ? (
        <Switcher
          switchStateArr={["Problems", "Reviews"]}
          switchState={switchState}
          setSwitchState={setSwitchState}
        />
      ) : null}

      <br />

      {!addingProblem && !editingProblem && !addingReview && !editingReview ? (
        <SearchBar
          inputValue={inputValue}
          autoComplete=""
          placeHolder={`Find ${switchState}...`}
          handleSearch={handleSearch}
          handleKeyPress={() => {}}
        />
      ) : null}

      <br />

      {!addingProblem && !editingProblem && !addingReview && !editingReview ? (
        <Button
          variant="primary"
          onClick={() => {
            if (switchState === "problems") setAddingProblem(true);
            else setAddingReview(true);
          }}
        >
          Add a {switchState === "problems" ? "problem" : "review"}
        </Button>
      ) : (
        <h4>
          {switchState === "problems"
            ? "Tell use what's wrong"
            : "Give us a review!"}
        </h4>
      )}

      <br />

      {switchState === "problems" ? (
        <Problems
          deviceId={deviceId}
          adding={addingProblem}
          openAdding={() => setAddingProblem(true)}
          closeAdding={() => setAddingProblem(false)}
          editing={editingProblem}
          openEditing={() => setEditingProblem(true)}
          closeEditing={() => setEditingProblem(false)}
        />
      ) : (
        <Reviews
          deviceId={deviceId}
          category={deviceCategory}
          adding={addingReview}
          editing={editingReview}
          openAdding={() => setAddingReview(true)}
          closeAdding={() => setAddingReview(false)}
          openEditing={() => setEditingReview(true)}
          closeEditing={() => setEditingReview(false)}
        />
      )}
    </div>
  );
};

export default Body;
