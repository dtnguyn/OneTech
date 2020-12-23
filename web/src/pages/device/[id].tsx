import { Divider } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Body from "../../components/DeviceDetail/DeviceDetailBody";
import Header from "../../components/DeviceDetail/DeviceDetailHeader";
import { ProblemContext } from "../../context/ProblemContext";
import {
  Device,
  DeviceProblem,
  useDeviceDetailQuery,
} from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import { client, withApollo } from "../../utils/withApollo";

interface DeviceDetailProps {}

const DeviceDetail: React.FC<DeviceDetailProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const [device, setDevice] = useState<Device>();
  const [problems, setProblems] = useState<DeviceProblem[]>([]);
  const { data, error } = useDeviceDetailQuery({
    variables: {
      id: id as string,
    },
  });

  useEffect(() => {
    const devices = data?.singleDevice?.data as Device[];

    if (devices && devices.length != 0) {
      setDevice(devices[0]);
      if (devices[0].problems && devices[0].problems.length != 0) {
        setProblems(devices[0].problems);
      }
    }
  }, []);

  if (!device) return null;

  return (
    <ProblemContext.Provider value={{ problems, setProblems }}>
      <div className={styles.deviceDetailContainer}>
        <Header device={device} />
        <br />
        <br />
        <Divider />
        <br />
        <Body deviceId={device.id} />
        <br />
        <br />
      </div>
    </ProblemContext.Provider>
  );
};

export default withApollo({ ssr: true })(DeviceDetail);
