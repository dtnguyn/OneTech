import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Device, useToggleDeviceFollowMutation } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import SpecsTable from "./SpecsTable";
import Switcher from "../Switcher";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  device: Device;
}

const Header: React.FC<HeaderProps> = ({ device }) => {
  const [switchState, setSwitchState] = useState("technical");
  const [followed, setFollowed] = useState(false);
  const { user } = useAuth();

  const [toggleDeviceFollowMutation, {}] = useToggleDeviceFollowMutation();

  const handleToggleFollowDevice = async (
    deviceId: string,
    userId: string,
    followState: boolean
  ) => {
    await toggleDeviceFollowMutation({
      variables: {
        deviceId,
        userId,
      },
    }).then((res) => {
      if (res.data?.toggleDeviceFollow.status) {
        setFollowed(!followState);
      }
    });
  };

  useEffect(() => {
    if (!user) {
      setFollowed(false);
      return;
    }
    for (const follower of device.followers!) {
      console.log(follower.userId, user.id);
      if (follower.userId === user.id) {
        setFollowed(true);
        return;
      }
    }
    setFollowed(false);
  }, [user]);

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
        <Button
          onClick={() => {
            if (!user) return;
            handleToggleFollowDevice(device.id, user.id, followed);
          }}
          variant={followed ? "secondary" : "success"}
          size="lg"
        >
          {followed ? "Unfollow this device" : "Follow this device"}
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
