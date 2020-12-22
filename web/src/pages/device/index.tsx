import React, { useEffect, useState } from "react";
import Body from "../../components/Devices/Body";
import Header from "../../components/Devices/Header";
import { DeviceContext } from "../../context/DeviceContext";
import { Device, useDevicesQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface DeviceProps {}

const Devices: React.FC<DeviceProps> = ({}) => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const { data, error, loading } = useDevicesQuery({
    variables: {
      all: true,
    },
  });

  useEffect(() => {
    setDevices(data?.devices.data as Device[]);
  }, [data]);

  if (!devices) return null;

  return (
    <DeviceContext.Provider value={{ devices, setDevices }}>
      <div>
        <Header />
        <Body />
      </div>
    </DeviceContext.Provider>
  );
};

export default withApollo({ ssr: true })(Devices);
