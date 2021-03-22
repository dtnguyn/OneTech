import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Notification } from "../../generated/graphql";
import CustomText from "../util/CustomText";

interface Props {
  notification: Notification;
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const [icon, setIcon] = useState<ImageSourcePropType>();

  useEffect(() => {
    switch (notification.category) {
      case "star":
        setIcon(require("../../assets/images/starred.png"));
        break;
      case "pick":
        setIcon(require("../../assets/images/check.png"));
        break;
      case "problem":
        setIcon(require("../../assets/images/problem.png"));
        break;
      case "solution":
        setIcon(require("../../assets/images/solution.png"));
        break;
    }
  }, []);

  if (!icon) return null;
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.notificationIcon} />
      <View style={styles.descriptionContainer}>
        <CustomText fontFamily="MSemiBold">{notification.title}</CustomText>
        <CustomText fontFamily="MLight">
          {moment(notification.createdAt).format("LL")}
        </CustomText>
        <CustomText>{notification.content}</CustomText>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/trash.png")}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  notificationIcon: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
  },
  descriptionContainer: {
    flex: 5,
    alignItems: "flex-start",
    marginStart: 10,
  },
  deleteIcon: {
    width: 32,
    height: 32,
  },
});

export default NotificationItem;
