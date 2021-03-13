import React, { useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import CustomText from "../util/CustomText";
import DeviceCategory from "./DeviceCategory";

interface Props {
  searchBoxExpand: boolean;
  setSearchBoxExpand: (expand: boolean) => void;
  searchPress: () => void;
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox: React.FC<Props> = ({
  searchBoxExpand,
  setSearchBoxExpand,
  searchPress,
  currentCategory,
  setCurrentCategory,
}) => {
  // return <View style={styles.searchBoxContainer}>
  //   <View style={styles.searchBox}>

  //   </View>
  // </View>;

  return (
    <View style={styles.searchBoxContainer}>
      <View style={styles.searchBox}>
        <View style={styles.searchBoxLeft}>
          <CustomText fontSize={22}>Devices</CustomText>
          <CustomText fontFamily="MRegular" fontSize={14}>
            Choose your device
          </CustomText>
        </View>
        <View style={styles.searchBoxRight}>
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={searchPress}
          >
            <Image
              source={require(`../../assets/images/search.png`)}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {searchBoxExpand ? (
        <View style={styles.categoriesBox}>
          <DeviceCategory
            icon={require("../../assets/images/smartphone.png")}
            category="phone"
            currentCategory={currentCategory}
            onClick={() => {
              if (currentCategory === "phone") return;
              setCurrentCategory("phone");
            }}
          />
          <DeviceCategory
            icon={require("../../assets/images/laptop.png")}
            category="laptop"
            currentCategory={currentCategory}
            onClick={() => {
              if (currentCategory === "laptop") return;
              setCurrentCategory("laptop");
            }}
          />
          <DeviceCategory
            icon={require("../../assets/images/pc.png")}
            category="pc"
            currentCategory={currentCategory}
            onClick={() => {
              if (currentCategory === "pc") return;
              setCurrentCategory("pc");
            }}
          />
        </View>
      ) : null}
      <TouchableOpacity
        style={styles.moreIconContainer}
        onPress={() => setSearchBoxExpand(!searchBoxExpand)}
      >
        <Image
          source={require(`../../assets/images/back.png`)}
          style={{
            ...styles.moreIcon,
            transform: [{ rotate: searchBoxExpand ? "90deg" : "270deg" }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    height: "auto",
    borderRadius: 15,
    backgroundColor: "#A8D8AD",
    padding: 10,
    marginVertical: 15,
  },
  searchBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: 100,
  },
  categoriesBox: {
    width: "100%",
    display: "flex",
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  searchBoxLeft: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: 15,
    justifyContent: "center",
    flex: 2,
  },
  searchBoxRight: {
    display: "flex",
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 53,
    height: 53,
    elevation: 4,
    backgroundColor: "#EFEFEF",
    borderRadius: 53,
    marginStart: "auto",
  },
  moreIconContainer: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    elevation: 4,
    backgroundColor: "#EFEFEF",
    borderRadius: 33,
  },
  searchIcon: {
    width: 34,
    height: 34,
  },
  moreIcon: {
    width: 12,
    height: 12,
  },
});

export default SearchBox;
