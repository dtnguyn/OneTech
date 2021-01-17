import React, { useEffect, useState } from "react";
import Body from "../../components/Devices/Body";
import Header from "../../components/Devices/Header";
import { DeviceContext } from "../../context/DeviceContext";
import { Device, useDevicesQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import styles from "../../styles/Devices.module.css";

interface DeviceProps {}

const Devices: React.FC<DeviceProps> = ({}) => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const { data, error, loading } = useDevicesQuery({
    variables: {
      category: "phone",
    },
  });

  useEffect(() => {
    setDevices(data?.devices.data as Device[]);
  }, [data]);

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
