import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../generated/graphql";
import CustomText from "../util/CustomText";

interface Props {
  moveToAuth: () => void;
  moveToAccount: (userId: string) => void;
}

const AppBar: React.FC<Props> = ({ moveToAuth, moveToAccount }) => {
  const { user } = useAuth();

  return (
    <View style={styles.appBar}>
      <Image
        source={require(`../../assets/images/logo.png`)}
        style={styles.logo}
      />
      <CustomText fontFamily="MRegular" fontSize={22}>
        OneTech
      </CustomText>
      {user ? (
        <TouchableOpacity
          style={styles.userIconContainer}
          onPress={() => {
            moveToAccount(user.id);
          }}
        >
          <FastImage source={{ uri: user.avatar }} style={styles.userIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.signInButton} onPress={moveToAuth}>
          <CustomText style={{ color: "#000" }}>Sign In</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
  },
  signInButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 40,
    height: 45,
    marginEnd: 10,
    marginStart: "auto",
    elevation: 4,
    backgroundColor: "#EFEFEF",
  },

  userIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 53,
    height: 53,
    marginEnd: 15,
    elevation: 4,
    backgroundColor: "#EFEFEF",
    borderRadius: 53,
    marginStart: "auto",
  },
  userIcon: {
    width: 53,
    height: 53,
    borderRadius: 53,
  },
});

export default AppBar;
