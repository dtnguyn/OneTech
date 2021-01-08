import { Dispatch, SetStateAction } from "react";
import styles from "../styles/Switcher.module.css";
import { useDarkMode } from "next-dark-mode";

interface SwitcherProps {
  switchState: string;
  setSwitchState: Dispatch<SetStateAction<string>>;
  switchStateArr: Array<string>;
}

const Switcher: React.FC<SwitcherProps> = ({
  switchState,
  setSwitchState,
  switchStateArr,
}) => {
  const { darkModeActive } = useDarkMode();

  return (
    <div className={styles.switchContainer}>
      {switchStateArr.map((state, index) => (
        <div
          key={state}
          id={
            index === 0
              ? styles.startSwitch
              : index === switchStateArr.length - 1
              ? styles.endSwitch
              : styles.midSwitch
          }
          className={
            switchState === state.toLowerCase()
              ? !darkModeActive
                ? styles.itemSwitchPicked
                : styles.itemSwitchDarkModePicked
              : !darkModeActive
              ? styles.itemSwitch
              : styles.itemSwitchDarkMode
          }
          onClick={() => setSwitchState(state.toLowerCase())}
        >
          {state}
        </div>
      ))}
    </div>
  );
};

export default Switcher;
