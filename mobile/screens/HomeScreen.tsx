import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
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
import { HomeScreenNavigationProp } from "../utils/types";
import { useAuth } from "../context/AuthContext";

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [brands, setBrands] = useState<Map<String, Device[]>>(new Map());
  const [devicesArr, setDevicesArr] = useState<Array<Device[]>>();
  const [searchBoxExpand, setSearchBoxExpand] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("phone");

  const { data, error, loading } = useDevicesQuery({
    variables: {
      category: currentCategory,
    },
  });

  const renderDevices: ListRenderItem<Device[]> = ({ item, index }) => {
    return (
      <DeviceCarousel devices={item} key={index} navigation={navigation} />
    );
  };

  function renderHeader() {
    return (
      <SearchBox
        searchBoxExpand={searchBoxExpand}
        setSearchBoxExpand={setSearchBoxExpand}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        searchPress={() => navigation.push("Search")}
      />
    );
  }

  useEffect(() => {
    if (data) {
      setDevices(data.devices.data as Device[]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // Handle error
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

  if (!devices) return null;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AppBar moveToAuth={() => navigation.push("Auth")} />

        <AnimatedLoader
          visible={loading}
          source={require("../assets/others/loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        />
        <FlatList
          style={{ marginBottom: 120 }}
          ListHeaderComponent={renderHeader}
          data={devicesArr}
          renderItem={renderDevices}
          keyExtractor={(_, index) => index + ""}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},

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
