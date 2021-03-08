import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMeQuery } from "../generated/graphql";
import { WebScreenNavigationProp } from "../utils/types";

interface Props {
  navigation: WebScreenNavigationProp;
}

const WebScreen: React.FC<Props> = ({ navigation }) => {
  const [logged, setLogged] = useState<boolean>();

  const { data } = useMeQuery({
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
      <WebView
        source={{
          uri: `https://api.onetech.guru/auth/login?method=google&from=${Linking.createURL(
            "/"
          )}`,
        }}
        userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
        style={{ width: "100%", height: "100%", marginTop: 40 }}
      />
    );
  else return <View />;
};

export default WebScreen;
