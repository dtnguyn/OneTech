import { Dispatch, SetStateAction } from "react";
import styles from "../styles/Switcher.module.css";

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
              ? styles.itemSwitchPicked
              : styles.itemSwitch
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
