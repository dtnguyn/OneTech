import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMeQuery } from "../generated/graphql";
import { ScreenNavigationProp, WebRouteProp } from "../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
  route: WebRouteProp;
}

const WebScreen: React.FC<Props> = ({ navigation, route }) => {
  const [logged, setLogged] = useState<boolean>();

  const { data, refetch } = useMeQuery({
    variables: {},
  });

  useEffect(() => {
    if (data?.me?.status) {
      setLogged(true);
      navigation.popToTop();
    } else setLogged(false);
  }, [data]);

  if (logged === false)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Done" onPress={() => refetch()} />
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
  else return <View />;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
});

export default WebScreen;
