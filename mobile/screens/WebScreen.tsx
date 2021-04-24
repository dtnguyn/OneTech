import CookieManager from "@react-native-cookies/cookies";
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useMeQuery } from "../generated/graphql";
import { ScreenNavigationProp, WebRouteProp } from "../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
  route: WebRouteProp;
}

const WebScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data, error, refetch } = useMeQuery({
    variables: {},
  });

  useEffect(() => {
    if (data?.me?.status) {
      CookieManager.get("https://onetech.guru").then((cookies) => {
        console.log("CookieManager.get =>", cookies);
        if (cookies.__gads) {
          CookieManager.set("https://onetech.guru", cookies.__gads)
            .then((done) => {
              console.log("CookieManager.set =>", done);
              navigation.popToTop();
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      });
    }
  }, [data]);

  useEffect(() => {
    CookieManager.clearAll().then((success) => {
      console.log("CookieManager.clearAll =>", success);
    });
  }, []);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

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
        thirdPartyCookiesEnabled={true}
        cacheEnabled={true}
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
