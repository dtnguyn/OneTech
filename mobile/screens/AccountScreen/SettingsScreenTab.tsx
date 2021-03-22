import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SettingItem from "../../components/account/SettingItem";
import CustomText from "../../components/util/CustomText";
import { useAuth } from "../../context/AuthContext";
import {
  UserSetting,
  useUpdateUserSettingMutation,
  useSettingQuery,
} from "../../generated/graphql";

interface Props {}

const SettingsScreenTab: React.FC<Props> = ({}) => {
  const [setting, setSetting] = useState<UserSetting>();

  const { user } = useAuth();

  const [updateUserSettingMutation, {}] = useUpdateUserSettingMutation();

  const { data, error } = useSettingQuery({
    variables: {
      userId: user?.id!,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleToggleSetting = (
    setting: "notifications" | "isPrivate",
    state: boolean
  ) => {
    updateUserSettingMutation({
      variables: {
        userId: user?.id!,
        [setting]: state,
      },
      update: (cache) => {
        cache.evict({ fieldName: "setting" });
        cache.evict({ fieldName: "me" });
      },
    });
  };

  useEffect(() => {
    const arr = data?.setting?.data as UserSetting[];

    if (arr && arr.length) {
      setSetting(arr[0]);
    }
  }, [data]);

  useEffect(() => {
    if (error && user) {
      alert(error);
    }
  }, [error]);

  if (!setting) return null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomText
          style={styles.settingTitle}
          fontFamily="MSemiBold"
          fontSize={20}
        >
          Account
        </CustomText>
        <View style={styles.divider} />
        <SettingItem
          title="Private mode"
          description="If enabled, people cannot see your profile in detailed"
          switchValue={setting.isPrivate}
          handleSwitchToggle={() => {}}
        />
        <SettingItem
          title="Notifications"
          description="If enabled, you will receive notifications from activities related to your posts and your followed devices"
          switchValue={setting.notifications}
          handleSwitchToggle={() => {
            handleToggleSetting("notifications", !setting.notifications);
          }}
        />
        <CustomText
          style={styles.settingTitle}
          fontFamily="MSemiBold"
          fontSize={20}
        >
          App
        </CustomText>
        <View style={styles.divider} />
        <SettingItem
          title="Dark mode"
          description="If enabled, the app will be in dark with white text"
          switchValue={setting.isPrivate}
          handleSwitchToggle={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#c4c4c4",
    marginTop: 10,
  },
  settingTitle: {
    marginTop: 20,
  },
});

export default SettingsScreenTab;
