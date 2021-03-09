import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { laptopSpec, mobileSpec, pcSpec } from "../../utils/specArr";
import CustomText from "../util/CustomText";
import RatingBar from "./RatingBar";
import SpecTableRow from "./SpecTableRow";

interface Props {
  currentOption: string;
  spec: any;
  rating: any;
  category: string;
}

const SpecTable: React.FC<Props> = ({
  currentOption,
  rating,
  spec,
  category,
}) => {
  const [specsArr, setSpecsArr] = useState<Array<string>>([]);

  useEffect(() => {
    switch (category) {
      case "phone":
        setSpecsArr(mobileSpec);
        break;
      case "laptop":
        setSpecsArr(laptopSpec);
        break;
      case "pc":
        setSpecsArr(pcSpec);
        break;
    }
  }, []);

  if (!rating) return null;
  console.log(rating);
  return (
    <View style={styles.container}>
      {specsArr.map((title) => (
        <SpecTableRow
          key={title}
          title={title}
          content={
            currentOption === "Rating" ? (
              <RatingBar rating={rating[title.toLowerCase()]} />
            ) : currentOption === "Technical" ? (
              <CustomText>{spec[title.toLowerCase()]}</CustomText>
            ) : (
              <CustomText>{spec[title.toLowerCase() + "Simplify"]}</CustomText>
            )
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
});

export default SpecTable;
