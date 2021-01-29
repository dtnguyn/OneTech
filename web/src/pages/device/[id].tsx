import { Divider } from "@material-ui/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Body from "../../components/DeviceDetail/DeviceDetailBody";
import Header from "../../components/DeviceDetail/DeviceDetailHeader";
import { ProblemContext } from "../../context/ProblemContext";
import { ReviewContext } from "../../context/ReviewContext";
import {
  Device,
  DeviceProblem,
  Review,
  ReviewRating,
  useDeviceDetailQuery,
  useDeviceRatingsQuery,
} from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import { client, withApollo } from "../../utils/withApollo";

interface DeviceDetailProps {}

const DeviceDetail: React.FC<DeviceDetailProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const { error: alert } = useAlert();
  const [device, setDevice] = useState<Device>();
  const [problems, setProblems] = useState<DeviceProblem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<ReviewRating>();
  const { data, error } = useDeviceDetailQuery({
    variables: {
      id: id as string,
    },
  });

  const { data: ratingData } = useDeviceRatingsQuery({
    variables: {
      deviceId: id as string,
    },
  });

  useEffect(() => {
    console.log("Call here", data?.singleDevice?.data);
    const devices = data?.singleDevice?.data as Device[];
    if (devices && devices.length != 0) {
      setDevice(devices[0]);
    }
  }, [data]);

  useEffect(() => {
    const ratings = ratingData?.ratings?.data as ReviewRating[];
    if (ratings && ratings?.length === 1) {
      console.log(ratings);
      setRating(ratings[0]);
    }
  }, [ratingData]);

  useEffect(() => {
    if (error) {
      alert(error?.message);
    }
  }, [error]);

  if (!device) return <div className={styles.deviceDetailContainer} />;

  return (
    <ProblemContext.Provider value={{ problems, setProblems }}>
      <ReviewContext.Provider value={{ reviews, setReviews }}>
        <Head>
          <title>{device.name}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className={styles.deviceDetailContainer}>
          <Header device={device} rating={rating} />
          <br />
          <br />
          <div className="divider" />
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
