import { Divider } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Body from "../../components/DeviceDetail/DeviceDetailBody";
import Header from "../../components/DeviceDetail/DeviceDetailHeader";
import { ProblemContext } from "../../context/ProblemContext";
import { ReviewContext } from "../../context/ReviewContext";
import {
  Device,
  DeviceProblem,
  Review,
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const { data, error } = useDeviceDetailQuery({
    variables: {
      id: id as string,
    },
  });

  useEffect(() => {
    console.log("Get device detail...");
    const devices = data?.singleDevice?.data as Device[];

    if (devices && devices.length != 0) {
      setDevice(devices[0]);
      if (devices[0].problems && devices[0].problems.length != 0) {
        setProblems(devices[0].problems);
      }
      if (devices[0].reviews && devices[0].reviews.length != 0) {
        setReviews(devices[0].reviews);
      }
    }
  }, [data]);

  if (!device) return null;

  return (
    <ProblemContext.Provider value={{ problems, setProblems }}>
      <ReviewContext.Provider value={{ reviews, setReviews }}>
        <div className={styles.deviceDetailContainer}>
          <Header device={device} />
          <br />
          <br />
          <Divider />
          <br />
          <Body deviceId={device.id} deviceCategory={device.category} />
          <br />
          <br />
        </div>
      </ReviewContext.Provider>
    </ProblemContext.Provider>
  );
};

export default withApollo({ ssr: true })(DeviceDetail);
