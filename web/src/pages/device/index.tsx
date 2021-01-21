import React, { useEffect, useState } from "react";
import Body from "../../components/Devices/Body";
import Header from "../../components/Devices/Header";
import { DeviceContext } from "../../context/DeviceContext";
import { Device, useDevicesQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import styles from "../../styles/Devices.module.css";
import { useAlert } from "react-alert";

interface DeviceProps {}

const Devices: React.FC<DeviceProps> = ({}) => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const { error: alert } = useAlert();
  const { data, error } = useDevicesQuery({
    variables: {
      category: "phone",
    },
  });

  useEffect(() => {
    setDevices(data?.devices.data as Device[]);
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error?.message);
    }
  }, [error]);

  return (
    <DeviceContext.Provider value={{ devices, setDevices }}>
      <div className={styles.devicesPageContainer}>
        <Header />
        <Body />
      </div>
    </DeviceContext.Provider>
  );
};

export default withApollo({ ssr: false })(Devices);
