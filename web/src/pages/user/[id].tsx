import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
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

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = ({}) => {
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User>();
  const [followedDevices, setFollowedDevices] = useState<Device[]>([]);
  const { id } = useRouter().query;
  const { data: userData } = useSingleUserQuery({
    variables: {
      id: id as string,
    },
  });
  const { data: followedDevicesData } = useDevicesQuery({
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

  if (!user) return null;
  return (
    <div className={styles.userPageContainer}>
      <Header user={user} />
      {user.setting?.isPrivate && currentUser?.id != user.id ? null : (
        <Body user={user} devices={followedDevices} />
      )}
      <Footer />
    </div>
  );
};

export default withApollo()(UserPage);
