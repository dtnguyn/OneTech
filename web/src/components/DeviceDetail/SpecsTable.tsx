import { DeviceSpec } from "../../generated/graphql";
import device from "../../pages/device";
import styles from "../../styles/DeviceDetail.module.css";
import RatingBar from "./RatingBar";
import TextContent from "./SpecsTableTextContent";

interface SpecsTableProps {
  switchState: string;
  spec: DeviceSpec | null | undefined;
}

const SpecsTable: React.FC<SpecsTableProps> = ({ switchState, spec }) => {
  const handleRatingBarColor = (number: number) => {
    if (number > 80) {
      return "#9bc72b";
    } else if (number > 60) {
      return "#a8d8ad";
    } else if (number > 40) {
      return "#f3e70a";
    } else if (number > 20) {
      return "#c65151";
    } else {
      return "#ca241c";
    }
  };

  console.log("spec: ", spec);

  return (
    <div className={styles.specsTableContainer}>
      <div className={styles.specsTableRow}>
        <div className={styles.specsTableRowTitle}>Display</div>
        <div className={styles.specsTableRowContent}>
          {switchState === "rating" ? (
            <RatingBar rating={7} />
          ) : (
            <TextContent
              textValue={
                switchState == "technical"
                  ? spec?.display
                  : spec?.displaySimplify
              }
            />
          )}
        </div>
      </div>

      <div className={styles.specsTableRow}>
        <div className={styles.specsTableRowTitle}>Processor</div>
        <div className={styles.specsTableRowContent}>
          {switchState === "rating" ? (
            <RatingBar rating={3} />
          ) : (
            <TextContent
              textValue={
                switchState == "technical"
                  ? spec?.processor
                  : spec?.processorSimplify
              }
            />
          )}
        </div>
      </div>

      <div className={styles.specsTableRow}>
        <div className={styles.specsTableRowTitle}>Battery</div>
        <div className={styles.specsTableRowContent}>
          {switchState === "rating" ? (
            <RatingBar rating={5} />
          ) : (
            <TextContent
              textValue={
                switchState == "technical"
                  ? spec?.battery
                  : spec?.batterySimplify
              }
            />
          )}
        </div>
      </div>

      <div className={styles.specsTableRow}>
        <div className={styles.specsTableRowTitle}>Software</div>
        <div className={styles.specsTableRowContent}>
          {switchState === "rating" ? (
            <RatingBar rating={1} />
          ) : (
            <TextContent
              textValue={
                switchState == "technical"
                  ? spec?.software
                  : spec?.softwareSimplify
              }
            />
          )}
        </div>
      </div>

      <div className={styles.specsTableRow}>
        <div className={styles.specsTableRowTitle}>Camera</div>
        <div className={styles.specsTableRowContent}>
          {switchState === "rating" ? (
            <RatingBar rating={9} />
          ) : (
            <TextContent
              textValue={
                switchState == "technical" ? spec?.camera : spec?.cameraSimplify
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecsTable;
