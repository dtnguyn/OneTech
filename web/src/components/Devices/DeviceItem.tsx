import { useRouter } from "next/router";
import { Device } from "../../generated/graphql";
import styles from "../../styles/Devices.module.css";

interface DeviceItemProps {
  device: Device;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  const router = useRouter();

  return (
    <div
      className={styles.deviceItemContainer}
      onClick={() => {
        router.push(`/device/${device.id}`);
      }}
    >
      <img className={styles.deviceItemImage} src={device.coverImage} />

      <h6 className={styles.deviceItemTitle}>{device.name}</h6>
      <p className={styles.deviceItemSub}>
        {device.followers?.length} users followed
      </p>
      <p className={styles.deviceItemSub}>
        {device.problems?.length} problems posted
      </p>
      <p className={styles.deviceItemSub}>{device.reviews?.length} reviews</p>
    </div>
  );
};

export default DeviceItem;
