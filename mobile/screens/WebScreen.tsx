import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMeQuery } from "../generated/graphql";
import { ScreenNavigationProp, WebRouteProp } from "../utils/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../components/util/CustomText";

interface Props {
  navigation: ScreenNavigationProp;
  route: WebRouteProp;
}

const WebScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data, refetch } = useMeQuery({
    variables: {},
  });

  useEffect(() => {
    if (data?.me?.status) {
      navigation.popToTop();
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="Cancel"
            color="#6C757D"
            onPress={async () => {
              await refetch();
              if (!data?.me?.status) navigation.pop();
            }}
          />
        </View>
        <View
          style={{
            marginLeft: "auto",
          }}
        >
          <Button title="Done" color="#28A744" onPress={() => refetch()} />
        </View>
      </View>

      <WebView
        source={{
          uri: route.params.url,
        }}
        sharedCookiesEnabled={true}
        userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
        style={{ width: "100%", height: "100%", marginTop: 0 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

export default WebScreen;
