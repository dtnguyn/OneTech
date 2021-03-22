import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import CustomText from "../util/CustomText";

interface Props {
  title: string;
  description: string;
  switchValue: boolean;
  handleSwitchToggle: () => void;
}

const SettingItem: React.FC<Props> = ({
  title,
  description,
  switchValue,
  handleSwitchToggle,
}) => {
  const [switchState, setSwitchState] = useState(switchValue);
  return (
    <View style={styles.container}>
      <CustomText fontFamily="MSemiBold">{title}</CustomText>
      <View style={styles.descriptionContainer}>
        <CustomText fontFamily="MLight" style={styles.description}>
          {description}
        </CustomText>
        <View style={styles.toggleContainer}>
          <Switch
            value={switchState}
            onValueChange={() => {
              setSwitchState(!switchState);
              handleSwitchToggle();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: "100%",
    alignItems: "flex-start",
  },
  descriptionContainer: {
    marginTop: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    flex: 5,
  },
  toggleContainer: {
    flex: 1,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingItem;
