import { Avatar } from "@material-ui/core";
import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import styles from "../../styles/NavBar.module.css";

interface UserDropdownProps {
  avatar: string | null;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ avatar }) => {
  return (
    <div className={styles.userDropdownContainer}>
      <Avatar
        className={styles.navbarAvatar}
        src={avatar ? avatar : ""}
      ></Avatar>
    </div>
  );
};

export default UserDropdown;
