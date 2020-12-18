import { useEffect, useState } from "react";
import { useDevice } from "../../context/DeviceContext";
import { Device } from "../../generated/graphql";
import device from "../../pages/device";
import DeviceCarousel from "./DeviceCarousel";

interface BodyProps {}

const Body: React.FC<BodyProps> = ({}) => {
  const { devices, setDevices } = useDevice();
  const [brands, setBrands] = useState<Map<String, Device[]>>(new Map());
  const [devicesArr, setDevicesArr] = useState<Array<Device[]>>();

  useEffect(() => {
    devices.map((device) => {
      console.log("here");
      if (brands.get(device.brand)) {
        brands.get(device.brand)?.push(device);
      } else {
        brands.set(device.brand, [device]);
      }
    });
    console.log(devices);
    console.log(brands);
    const arr: Array<Device[]> = [];
    for (const [key, value] of brands.entries()) {
      arr.push(value);
    }
    console.log(arr);
    setDevicesArr(arr);
  }, []);

  return (
    <div>
      {devicesArr?.map((devices) => (
        <DeviceCarousel key={devices[0].brand} devices={devices} />
      ))}
    </div>
  );
};

export default Body;
