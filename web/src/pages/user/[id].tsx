import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Body from "../../components/User/UserBody";
import Header from "../../components/User/UserHeader";
import { useAuth } from "../../context/AuthContext";
import { Device, useDevicesQuery } from "../../generated/graphql";

import styles from "../../styles/User.module.css";
import { client, withApollo } from "../../utils/withApollo";

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = ({}) => {
  const { user } = useAuth();
  const [followedDevices, setFollowedDevices] = useState<Device[]>([]);

  const { data: followedDevicesData } = useDevicesQuery({
    variables: {
      userId: user?.id,
    },
    client: client,
  });

  useEffect(() => {
    const arr = followedDevicesData?.devices.data as Device[];
    if (arr) {
      setFollowedDevices(arr);
    }
  }, [followedDevicesData]);

  return (
    <div className={styles.userPageContainer}>
      <Header />
      <Body devices={followedDevices} />
      <Footer />
    </div>
  );
};

export default withApollo()(UserPage);
