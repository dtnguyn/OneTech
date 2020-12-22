import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/DeviceDetail/DeviceDetailHeader";
import { Device, useDeviceDetailQuery } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import { client } from "../../utils/withApollo";

interface DeviceDetailProps {}

const DeviceDetail: React.FC<DeviceDetailProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const [device, setDevice] = useState<Device>();
  const { data, error } = useDeviceDetailQuery({
    variables: {
      id: id as string,
    },
    client: client,
  });

  useEffect(() => {
    const devices = data?.singleDevice?.data as Device[];

    if (devices && devices.length != 0) {
      setDevice(devices[0]);
    }
  });

  if (!device) return null;

  return (
    <div className={styles.deviceDetailContainer}>
      <Header device={device} />
    </div>
  );
};

export default DeviceDetail;
