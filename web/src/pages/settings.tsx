import { Divider } from "@material-ui/core";
import SettingItem from "../components/Settings/SettingItem";
import styles from "../styles/Settings.module.css";
import { useDarkMode } from "next-dark-mode";
import { withApollo } from "../utils/withApollo";
import {
  UserSetting,
  useSettingQuery,
  useUpdateUserSettingMutation,
} from "../generated/graphql";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();
  const { user } = useAuth();
  const [setting, setSetting] = useState<UserSetting>();

  const [updateUserSettingMutation, {}] = useUpdateUserSettingMutation();

  const { data } = useSettingQuery({
    variables: {
      userId: user?.id!,
    },
  });

  useEffect(() => {
    const arr = data?.setting?.data as UserSetting[];
    console.log(arr);
    if (arr && arr.length) {
      setSetting(arr[0]);
    }
  }, [data]);

  return (
    <div className={styles.settingsPageContainer}>
      <p className={styles.settingsPageTitle}>Settings</p>

      <div className={styles.settingsSectionContainer}>
        {user && setting ? (
          <>
            <p className={styles.settingsSectionTitle}>Account</p>
            <SettingItem
              image="/images/private.png"
              title="Private mode"
              content="If enabled, people cannot see your profile in detailed."
              defaultValue={setting ? setting.isPrivate : false}
              handleChange={(state) => {
                console.log(setting);
                updateUserSettingMutation({
                  variables: {
                    userId: user?.id!,
                    isPrivate: state,
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: "setting" });
                  },
                });
              }}
            />
            <SettingItem
              image="/images/notification.png"
              title="Notifications"
              content="If enabled, you will receive notifications from activities related to your posts and your followed devices"
              defaultValue={setting ? setting.notifications : false}
              handleChange={(state) => {
                {
                  updateUserSettingMutation({
                    variables: {
                      userId: user?.id!,
                      notifications: state,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "setting" });
                      cache.evict({ fieldName: "me" });
                    },
                  });
                }
              }}
            />
          </>
        ) : null}
        <br />
        <p className={styles.settingsSectionTitle}>Website</p>

        <SettingItem
          image="/images/dark-mode.png"
          title="Dark mode"
          content="If enabled, the website will be in dark with white text"
          onColor="#404040"
          checkedIcon={
            <img src="/images/moon.png" className={styles.toggleIcon} />
          }
          unCheckedIcon={
            <img src="/images/sunny.png" className={styles.toggleIcon} />
          }
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

export default withApollo({ ssr: false })(Settings);
