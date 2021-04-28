import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  Platform,
} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/home/AppBar";
import DeviceCarousel from "../components/home/DeviceCarousel";
import DeviceCategory from "../components/home/DeviceCategory";
import SearchBox from "../components/home/SearchBox";
import {
  Device,
  useDevicesQuery,
  useMeQuery,
  User,
} from "../generated/graphql";
import { ScreenNavigationProp } from "../utils/types";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import EmptyPlaceholder from "../components/util/EmptyPlaceholder";
import CustomText from "../components/util/CustomText";
import { useSafeArea } from "react-native-safe-area-context";

interface Props {
  navigation: ScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [devices, setDevices] = useState<Array<Device>>();
  const [brands, setBrands] = useState<Map<String, Device[]>>(new Map());
  const [devicesArr, setDevicesArr] = useState<Array<Device[]>>();
  const [searchBoxExpand, setSearchBoxExpand] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("phone");
  const { theme } = useTheme();
  const insets = useSafeArea();

  const { data, error, loading } = useDevicesQuery({
    variables: {
      category: currentCategory,
    },
  });

  const renderDevices: ListRenderItem<Device[]> = ({ item, index }) => {
    return (
      <DeviceCarousel
        devices={item}
        key={index}
        title={item.length ? item[0].brand : "No available device"}
        navigation={navigation}
      />
    );
  };

  function renderHeader() {
    if (!devices) return null;
    else
      return (
        <View>
          <AppBar
            moveToAuth={() => navigation.push("Auth")}
            moveToAccount={(userId) => navigation.push("Account", { userId })}
          />
          <SearchBox
            searchBoxExpand={searchBoxExpand}
            setSearchBoxExpand={setSearchBoxExpand}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            searchPress={() => navigation.push("Search")}
          />
          {devicesArr?.length ? null : (
            <EmptyPlaceholder
              title={`No devices available for ${currentCategory}`}
              content="More devices coming soon!"
            />
          )}
        </View>
      );
  }

  useEffect(() => {
    if (data) {
      setDevices(data.devices.data as Device[]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    let isMounted = true;
    setBrands(new Map());
    setDevicesArr([]);
    devices?.map((device) => {
      if (brands.get(device.brand)) {
        brands.get(device.brand)?.push(device);
      } else {
        brands.set(device.brand, [device]);
      }
    });
    const arr: Array<Device[]> = [];

    if (brands.get("Apple")) arr.push(brands.get("Apple")!);
    if (brands.get("Samsung")) arr.push(brands.get("Samsung")!);
    if (brands.get("Google")) arr.push(brands.get("Google")!);
    if (brands.get("OnePlus")) arr.push(brands.get("OnePlus")!);

    setDevicesArr(arr);
    return () => {
      isMounted = false;
    };
  }, [devices]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  if (!devices) return null;
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: -insets.bottom }}>
      <View>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={renderHeader}
            data={devicesArr}
            renderItem={renderDevices}
            keyExtractor={(_, index) => index + ""}
          />
        </View>

        <StatusBar style={theme === "light" ? "dark" : "light"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  carouselContainer: {
    marginVertical: 15,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
function useAlert(): { error: any } {
  throw new Error("Function not implemented.");
}
