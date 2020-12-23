import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useProblem } from "../../context/ProblemContext";
import { DeviceProblem, useProblemsQuery } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import { client } from "../../utils/withApollo";
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
  const handleSearchDevice: (event: ChangeEvent<HTMLInputElement>) => void = (
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
      <Switcher
        switchStateArr={["Problems", "Reviews"]}
        switchState={switchState}
        setSwitchState={setSwitchState}
      />
      <br />
      <br />
      <SearchBar
        inputValue={inputValue}
        autoComplete=""
        placeHolder={`Find ${switchState}...`}
        handleSearchDevice={handleSearchDevice}
        handleKeyPress={() => {}}
      />
      <br />
      <Button variant="outline-primary">
        Add a {switchState === "problems" ? "problem" : "review"}
      </Button>
      <br />
      {switchState === "problems" ? <Problems /> : <Reviews />}
    </div>
  );
};

export default Body;
