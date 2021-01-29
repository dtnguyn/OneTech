import { useEffect, useState } from "react";
import { useDevice } from "../../context/DeviceContext";
import { Device } from "../../generated/graphql";
import device from "../../pages/device";
import DeviceCarousel from "../DeviceCarousel";

interface BodyProps {}

const Body: React.FC<BodyProps> = ({}) => {
  const { devices, setDevices } = useDevice();
  const [brands, setBrands] = useState<Map<String, Device[]>>(new Map());
  const [devicesArr, setDevicesArr] = useState<Array<Device[]>>();

  useEffect(() => {
    setBrands(new Map());
    setDevicesArr([]);
    devices?.map((device) => {
      if (brands.get(device.brand)) {
        brands.get(device.brand)?.push(device);
      } else {
        brands.set(device.brand, [device]);
      }
    });
    const arr: Array<Device[]> = [];

    if (brands.get("Apple")) arr.push(brands.get("Apple")!);
    if (brands.get("Samsung")) arr.push(brands.get("Samsung")!);
    if (brands.get("Google")) arr.push(brands.get("Google")!);
    if (brands.get("OnePlus")) arr.push(brands.get("OnePlus")!);

    setDevicesArr(arr);
  }, [devices]);

  return (
    <div>
      {devicesArr?.map((devices) => (
        <DeviceCarousel
          key={devices[0].brand}
          title={devices[0].brand}
          devices={devices}
        />
      ))}
    </div>
  );
};

export default Body;
