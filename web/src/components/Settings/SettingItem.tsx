import { Switch } from "@material-ui/core";
import { useState } from "react";
import styles from "../../styles/Settings.module.css";

interface SettingItemProps {
  image: string;
  title: string;
  content: string;
  defaultValue: boolean;
  handleChange: (state: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  image,
  title,
  content,
  defaultValue,
  handleChange,
}) => {
  const [on, setOn] = useState(defaultValue);

  return (
    <div className={styles.settingItemContainer}>
      <div className={styles.settingItemFirstSection}>
        <div className={styles.settingItemIconContainer}>
          <img src={image} className={styles.settingItemIcon} />
        </div>
      </div>
      <div className={styles.settingItemSecondSection}>
        <div className={styles.settingItemTextContainer}>
          <p className={styles.settingItemTitle}>{title}</p>
          <p className={styles.settingItemContent}>{content}</p>
        </div>
      </div>
      <div className={styles.settingItemThirdSection}>
        <div className={styles.settingToggleContainer}>
          <Switch
            size="medium"
            checked={on}
            onChange={() => {
              handleChange(!on);
              setOn(!on);
            }}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingItem;
