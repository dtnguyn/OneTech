import { TextField } from "@material-ui/core";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useProblem } from "../../context/ProblemContext";
import {
  DeviceProblem,
  useCreateProblemMutation,
  useProblemsQuery,
} from "../../generated/graphql";
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
}

const Body: React.FC<BodyProps> = ({ deviceId }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [initialState, setInitialState] = useState<boolean>(true);
  const { problems, setProblems } = useProblem();

  const [adding, setAdding] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const { user } = useAuth();
  const { data } = useProblemsQuery({
    variables: {
      deviceId,
      title: searchValue,
      content: searchValue,
    },
    client: client,
  });

  const [switchState, setSwitchState] = useState<string>("problems");

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
    const problemArr = data?.problems?.data as DeviceProblem[];
    console.log("useEffect", problemArr);
    if (problemArr) console.log("found: ", problemArr, searchValue);
    if (problemArr && problemArr.length != 0) {
      //found devices
      if (!initialState) {
        console.log("set problems");
        setProblems(problemArr);
      }

      if (searchValue) {
        const position = problemArr[0].title.toLowerCase().indexOf(searchValue);
        const name = problemArr[0].title.toLowerCase().substring(position);
      }
      setInitialState(false);
    } else if (problemArr && problemArr.length == 0) {
      //not found
      console.log("set devices empty array");
      setProblems([]);
    }
  }, [data]);

  return (
    <div className={styles.deviceDetailBodyContainer}>
      {!adding && !editing ? (
        <Switcher
          switchStateArr={["Problems", "Reviews"]}
          switchState={switchState}
          setSwitchState={setSwitchState}
        />
      ) : null}

      <br />

      {!adding && !editing ? (
        <SearchBar
          inputValue={inputValue}
          autoComplete=""
          placeHolder={`Find ${switchState}...`}
          handleSearch={handleSearch}
          handleKeyPress={() => {}}
        />
      ) : null}

      <br />

      {!adding && !editing ? (
        <Button variant="primary" onClick={() => setAdding(true)}>
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
          adding={adding}
          openAdding={() => setAdding(true)}
          closeAdding={() => setAdding(false)}
          editing={editing}
          openEditing={() => setEditing(true)}
          closeEditing={() => setEditing(false)}
        />
      ) : (
        <Reviews />
      )}
    </div>
  );
};

export default Body;
