import { Divider } from "@material-ui/core";
import SettingItem from "../components/Settings/SettingItem";
import styles from "../styles/Settings.module.css";
import { useDarkMode } from "next-dark-mode";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();

  return (
    <div className={styles.settingsPageContainer}>
      <p className={styles.settingsPageTitle}>Settings</p>
      <div className={styles.settingsSectionContainer}>
        <p className={styles.settingsSectionTitle}>Account</p>
        <SettingItem
          image="/images/private.png"
          title="Private mode"
          content="If enabled, people cannot see your profile in detailed."
          defaultValue={false}
          handleChange={() => {}}
        />
        <br />
        <p className={styles.settingsSectionTitle}>Website</p>

        <SettingItem
          image="/images/dark-mode.png"
          title="Dark mode"
          content="If enabled, the website will be in dark with white text"
          defaultValue={darkModeActive}
          handleChange={(state) => {
            console.log(state);
            if (state) switchToDarkMode();
            else switchToLightMode();
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
