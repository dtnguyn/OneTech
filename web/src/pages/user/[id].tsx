import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Body from "../../components/User/UserBody";
import Header from "../../components/User/UserHeader";
import { useAuth } from "../../context/AuthContext";
import {
  Device,
  useDevicesQuery,
  User,
  useSingleUserQuery,
} from "../../generated/graphql";

import styles from "../../styles/User.module.css";
import { client, withApollo } from "../../utils/withApollo";
import Head from "next/head";

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = ({}) => {
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User>();
  const [followedDevices, setFollowedDevices] = useState<Device[]>([]);
  const { id } = useRouter().query;
  const { data: userData, error: userError } = useSingleUserQuery({
    variables: {
      id: id as string,
    },
  });
  const {
    data: followedDevicesData,
    error: followedDevicesError,
  } = useDevicesQuery({
    variables: {
      userId: id as string,
    },
    client: client,
  });

  useEffect(() => {
    const arr = followedDevicesData?.devices.data as Device[];
    if (arr) {
      setFollowedDevices(arr);
    }
  }, [followedDevicesData]);

  useEffect(() => {
    const arr = userData?.singleUser.data as User[];
    if (arr && arr.length) {
      setUser(arr[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (userError) {
      alert(userError.message);
    }

    if (followedDevicesError) alert(followedDevicesError.message);
  }, [userError, followedDevicesError]);

  if (!user) return <div className={styles.userPageContainer} />;
  return (
    <div className={styles.userPageContainer}>
      <Head>
        <title>{user.username}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header user={user} />
      {user.setting?.isPrivate && currentUser?.id != user.id ? null : (
        <Body user={user} devices={followedDevices} />
      )}
    </div>
  );
};

export default withApollo()(UserPage);
