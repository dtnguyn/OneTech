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
  const [device, setDevice] = useState<Device>();
  const [problems, setProblems] = useState<DeviceProblem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<ReviewRating>();
  const { data, loading } = useDeviceDetailQuery({
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
      setRating(ratings[0]);
    }
  }, [ratingData]);

  if (!device) return null;

  return (
    <ProblemContext.Provider value={{ problems, setProblems }}>
      <ReviewContext.Provider value={{ reviews, setReviews }}>
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
