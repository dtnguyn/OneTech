import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Device, useToggleDeviceFollowMutation } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import SpecsTable from "./SpecsTable";
import Switcher from "../Switcher";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

interface HeaderProps {
  device: Device;
  rating: any;
}

const Header: React.FC<HeaderProps> = ({ device, rating }) => {
  const [switchState, setSwitchState] = useState("technical");
  const [followed, setFollowed] = useState(false);
  const { user } = useAuth();
  const { error: alert } = useAlert();
  const [toggleDeviceFollowMutation, {}] = useToggleDeviceFollowMutation();
  const router = useRouter();

  const handleToggleFollowDevice = async (deviceId: string, userId: string) => {
    await toggleDeviceFollowMutation({
      variables: {
        deviceId,
        userId,
      },
      update: (cache) => {
        cache.evict({ fieldName: "singleDevice" });
        cache.evict({ fieldName: "devices" });
      },
    })
      .then((res) => {
        if (!res.data?.toggleDeviceFollow.status) {
          throw Error(res.data?.toggleDeviceFollow.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    if (!user) {
      setFollowed(false);
      return;
    }
    for (const follower of device.followers!) {
      if (follower.userId === user.id) {
        setFollowed(true);
        return;
      }
    }
    setFollowed(false);
  }, [user, device]);

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
          rating={rating}
          category={device.category}
        />
        <Button
          onClick={() => {
            if (!user) {
              alert("Please login first.");
              return;
            }
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
        <p className={styles.deviceDetailText}>
          {device.price ? device.price : `Price not available`}
        </p>
        <img
          className={styles.deviceDetailImage}
          alt="Device image"
          src={device.coverImage}
        />
        <Button
          variant="primary"
          disabled={!!!device.buyLink}
          size="lg"
          onClick={() => {
            if (device.buyLink) {
              router.push(device.buyLink);
            }
          }}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default Header;
