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
  return (
    <View style={styles.container}>
      {specsArr.map((title) => (
        <SpecTableRow
          key={title}
          title={title}
          content={
            currentOption === "Rating" && rating ? (
              <RatingBar rating={rating[title.toLowerCase()]} />
            ) : currentOption === "Technical" ? (
              <CustomText>{spec ? spec[title.toLowerCase()] : null}</CustomText>
            ) : (
              <CustomText>
                {spec ? spec[title.toLowerCase() + "Simplify"] : null}
              </CustomText>
            )
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 50,
  },
});

export default SpecTable;
