import { Device } from "../../generated/graphql";
import DeviceCarousel from "../DeviceCarousel";
import UserPosts from "./UserPosts";
import styles from "../../styles/User.module.css";
import { Divider } from "@material-ui/core";

interface BodyProps {
  devices: Device[];
}

const Body: React.FC<BodyProps> = ({ devices }) => {
  return (
    <div className={styles.userPageBodyContainer}>
      <DeviceCarousel
        title={`Followed devices (${devices.length})`}
        devices={devices}
      />

      <Divider />
      <UserPosts />
    </div>
  );
};

export default Body;
