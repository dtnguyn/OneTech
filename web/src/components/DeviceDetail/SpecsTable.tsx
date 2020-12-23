import { useEffect, useState } from "react";
import { DeviceSpec } from "../../generated/graphql";
import device from "../../pages/device";
import styles from "../../styles/DeviceDetail.module.css";
import RatingBar from "./RatingBar";
import TextContent from "./SpecsTableTextContent";

interface SpecsTableProps {
  switchState: string;
  spec: any;
  category: string;
}

const SpecsTable: React.FC<SpecsTableProps> = ({
  switchState,
  spec,
  category,
}) => {
  const [specsArr, setSpecsArr] = useState<Array<string>>([]);

  useEffect(() => {
    switch (category) {
      case "phone":
        setSpecsArr(["Display", "Processor", "Battery", "Software", "Camera"]);
        break;
      case "laptop":
        setSpecsArr(["Display", "Processor", "Battery", "Software", "Camera"]);
        break;
      case "pc":
        setSpecsArr(["Display", "Processor", "Battery", "Software", "Camera"]);
        break;
    }
  }, []);

  return (
    <div className={styles.specsTableContainer}>
      {specsArr.map((title) => (
        <div key={title} className={styles.specsTableRow}>
          <div className={styles.specsTableRowTitle}>{title}</div>
          <div className={styles.specsTableRowContent}>
            {switchState === "rating" ? (
              <RatingBar rating={7} />
            ) : (
              <TextContent
                textValue={
                  switchState == "technical"
                    ? spec[title.toLowerCase()]
                    : spec[title.toLowerCase() + "Simplify"]
                }
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecsTable;
