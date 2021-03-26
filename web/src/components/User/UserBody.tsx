import { Device, User } from "../../generated/graphql";
import DeviceCarousel from "../DeviceCarousel";
import UserPosts from "./UserPosts";
import styles from "../../styles/User.module.css";
import { Divider } from "@material-ui/core";

interface BodyProps {
  user: User;
  devices: Device[];
}

const Body: React.FC<BodyProps> = ({ user, devices }) => {
  console.log("user: ", user);
  return (
    <div className={styles.userPageBodyContainer}>
      {devices.length ? (
        <DeviceCarousel
          title={`Followed devices (${devices.length})`}
          devices={devices}
        />
      ) : null}

      <div className="divider" />
      <UserPosts user={user} />
    </div>
  );
};

export default Body;
