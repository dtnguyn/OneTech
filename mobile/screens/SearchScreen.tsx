import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AutoComplete from "../components/search/AutoComplete";
import CustomText from "../components/util/CustomText";
import { useTheme } from "../context/ThemeContext";
import { Device, useDevicesQuery } from "../generated/graphql";
import { ScreenNavigationProp } from "../utils/types";

interface Props {
  navigation: ScreenNavigationProp;
}

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [devices, setDevices] = useState<Array<Device>>([]);
  const { theme } = useTheme();

  const { data, error, loading } = useDevicesQuery({
    variables: {
      name: searchText,
    },
  });

  let timeout: NodeJS.Timeout;
  const handleSearchDevice: (text: string) => void = (text) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchText(text);
    }, 700);
  };

  const renderItem: ListRenderItem<Device> = ({ item }) => {
    return (
      <AutoComplete
        key={item.id}
        title={item.name}
        pressAction={(title) =>
          navigation.push("Detail", {
            name: title,
            id: item.id,
            category: item.category,
          })
        }
      />
    );
  };

  useEffect(() => {
    const arr = data?.devices.data as Device[];
    if (arr) {
      setDevices(arr);
    }
  }, [data]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.appBarContainer}>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => navigation.pop()}
          >
            <Image
              source={require("../assets/images/back.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <CustomText fontFamily="MSemiBold" fontSize={20}>
            Search for your device
          </CustomText>
        </View>
        <TextInput
          style={{
            ...styles.textInputContainer,
            color: theme === "light" ? "#000" : "#fafafa",
          }}
          placeholderTextColor={theme === "light" ? "#c4c4c4" : "#545454"}
          placeholder="enter your device name..."
          onChangeText={(text) => {
            handleSearchDevice(text);
          }}
        />
        <FlatList
          style={{ width: "100%" }}
          data={devices}
          renderItem={renderItem}
        />
      </View>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={theme === "light" ? "#A8D8AD" : "#336B39"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginHorizontal: 10,
    height: "100%",
  },
  appBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  backIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    paddingEnd: 2,
    backgroundColor: "#FEFEFE",
    elevation: 4,
    marginTop: 4,
    marginEnd: 10,
    borderRadius: 55,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textInputContainer: {
    margin: 10,
    width: "100%",
    height: 50,
    fontFamily: "MMedium",
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 5,
  },
});

export default SearchScreen;
