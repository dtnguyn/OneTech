import { useState } from "react";
import { Button } from "react-bootstrap";
import { Device } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import SpecsTable from "./SpecsTable";
import Switcher from "../Switcher";

interface HeaderProps {
  device: Device;
}

const Header: React.FC<HeaderProps> = ({ device }) => {
  const [switchState, setSwitchState] = useState("technical");

  return (
    <div className={`row ${styles.deviceDetailHeaderContainer}`}>
      <div className={`col-lg-7 col-md-12 ${styles.deviceDetailHeaderSection}`}>
        <Switcher
          switchStateArr={["Technical", "Simplify", "Rating"]}
          switchState={switchState}
          setSwitchState={setSwitchState}
        />
        <SpecsTable
          switchState={switchState}
          spec={device.spec}
          category={device.category}
        />
        <Button variant="success" size="lg">
          Follow this device
        </Button>
      </div>

      <div className={`col-lg-5 col-md-12 ${styles.deviceDetailHeaderSection}`}>
        <h4 className={styles.deviceDetailTitle}>{device.name}</h4>
        <p className={styles.deviceDetailText}>$799</p>
        <img
          className={styles.deviceDetailImage}
          alt="Device image"
          src={device.coverImage}
        />
        <Button variant="primary" size="lg">
          Buy
        </Button>
      </div>
    </div>
  );
};

export default Header;
