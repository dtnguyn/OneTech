import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDevice } from "../../context/DeviceContext";
import { Device, useDevicesQuery } from "../../generated/graphql";
import styles from "../../styles/Devices.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { devices, setDevices } = useDevice();
  const [autoComplete, setAutoComplete] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [initialState, setInitialState] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("phone");
  const { data } = useDevicesQuery({
    variables: {
      name: searchValue,
      category,
    },
  });

  let timeout: NodeJS.Timeout;
  const handleSearchDevice: (event: ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    setInputValue(event.target.value);
    setAutoComplete("");
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchValue(event.target.value);
    }, 700);
  };

  useEffect(() => {
    const arr = data?.devices.data as Device[];
    if (arr) console.log("useEffect", arr, searchValue);
    if (arr && arr.length != 0) {
      //found devices
      if (!initialState) {
        console.log("set devices");
        setDevices(arr);
      }
      if (searchValue) {
        const position = arr[0].name.toLowerCase().indexOf(searchValue);
        const name = arr[0].name.toLowerCase().substring(position);
        setAutoComplete(name);
      }
    } else if (arr && arr.length == 0) {
      //not found
      console.log("set devices empty array");
      setDevices([]);
    }
    setInitialState(false);
  }, [data]);

  return (
    <div className={styles.headerContainer}>
      <h4 className={styles.headerTitle}>Find your devices</h4>
      <div className={styles.headerInputContainer}>
        <input
          value={inputValue}
          className={styles.headerInput}
          placeholder="Enter your device..."
          onChange={handleSearchDevice}
          onKeyPress={(event) => {
            if (event.key === "Enter" && autoComplete) {
              setInputValue(autoComplete);
              setSearchValue(autoComplete);
            }
          }}
        />

        <p className={styles.headerInputAutoComplete}>{autoComplete}</p>
        <img
          className={styles.headerInputIcon}
          src="./images/search-icon.svg"
        />
      </div>
      <div className={styles.deviceCategoryContainer}>
        <div
          className={
            category === "phone"
              ? styles.deviceCategoryIconContainerPicked
              : styles.deviceCategoryIconContainer
          }
          onClick={() => setCategory("phone")}
        >
          <img
            className={styles.deviceCategoryIcon}
            src="./images/smartphone.svg"
          />
          Phone
        </div>
        <div
          className={
            category === "laptop"
              ? styles.deviceCategoryIconContainerPicked
              : styles.deviceCategoryIconContainer
          }
          onClick={() => setCategory("laptop")}
        >
          <img
            className={styles.deviceCategoryIcon}
            src="./images/laptop.svg"
          />
          Laptop
        </div>
        <div
          className={
            category === "pc"
              ? styles.deviceCategoryIconContainerPicked
              : styles.deviceCategoryIconContainer
          }
          onClick={() => setCategory("pc")}
        >
          <img className={styles.deviceCategoryIcon} src="./images/pc.svg" />
          PC
        </div>
      </div>
    </div>
  );
};

export default Header;
