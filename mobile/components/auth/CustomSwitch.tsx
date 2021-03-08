import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../util/CustomText";

interface Props {
  options: string[];
  currentOption: string;
  optionWidth: number;
  changeOption: (option: string) => void;
}

const CustomSwitch: React.FC<Props> = ({
  options,
  currentOption,
  optionWidth,
  changeOption,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <View
          key={index}
          style={{
            ...styles.option,
            width: optionWidth,
            backgroundColor: option === currentOption ? "#A8D8AD" : "#EBEBEB",
            borderTopLeftRadius: index === 0 ? 40 : 0,
            borderBottomLeftRadius: index === 0 ? 40 : 0,
            borderTopRightRadius: index === options.length - 1 ? 40 : 0,
            borderBottomRightRadius: index === options.length - 1 ? 40 : 0,
            borderRightWidth: index !== options.length - 1 ? 0.5 : 0,
          }}
        >
          <TouchableOpacity onPress={() => changeOption(option)}>
            <CustomText style={{ marginEnd: 10 }}>{option}</CustomText>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    backgroundColor: "#EBEBEB",
    display: "flex",
    flexDirection: "row",
    paddingStart: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "#C9C7C7",
  },
});

export default CustomSwitch;
