import { useState } from "react";
import styles from "../../styles/Settings.module.css";
import Switch from "react-switch";

interface SettingItemProps {
  image: string;
  title: string;
  content: string;
  defaultValue: boolean;
  checkedIcon?: JSX.Element;
  unCheckedIcon?: JSX.Element;
  onColor?: string;
  offColor?: string;
  handleChange: (state: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  image,
  title,
  content,
  defaultValue,
  onColor,
  offColor,
  checkedIcon,
  unCheckedIcon,
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
            checked={on}
            onChange={() => {
              handleChange(!on);
              setOn(!on);
            }}
            onColor={onColor}
            offColor={offColor}
            checkedIcon={checkedIcon ? checkedIcon : false}
            uncheckedIcon={unCheckedIcon ? unCheckedIcon : false}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingItem;
