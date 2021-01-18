import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Avatar, Divider } from "@material-ui/core";
import {
  Notification,
  useLogoutMutation,
  useNotificationsQuery,
} from "../generated/graphql";
import { client } from "../utils/withApollo";
import { Router, useRouter } from "next/router";
import { useDarkMode } from "next-dark-mode";
import { useAlert } from "react-alert";
import useWindowDimensions from "../utils/useWindowDimensions";
import socketIOClient from "socket.io-client";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user, setUser } = useAuth();
  const [dropdown, setDropDown] = useState(false);
  const { error: alert } = useAlert();
  const [small, setSmall] = useState(false);
  const router = useRouter();
  const [unseen, setUnseen] = useState<Notification[]>([]);
  const [logoutMutation, {}] = useLogoutMutation({
    client: client,
  });
  const { data, refetch } = useNotificationsQuery({
    variables: { unseen: true },
    client,
  });
  const { darkModeActive } = useDarkMode();

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");
    if (user) {
      socket.on(`notification:${user?.id}`, () => {
        refetch({
          unseen: true,
        });
      });

      socket.on(`seenNotifications:${user?.id}`, () => {
        refetch({
          unseen: true,
        });
      });
    }
    const arr = data?.notifications.data as Notification[];
    console.log("update unseen");
    if (arr) {
      console.log(arr, user?.setting?.notifications);
      if (user?.setting?.notifications) {
        setUnseen(arr);
      } else {
        setUnseen([]);
      }
    }
  }, [data, user]);

  return (
    <div className={styles.container}>
      <Navbar collapseOnSelect expand="lg">
        <Link href="/">
          <a
            className={
              darkModeActive ? styles.navbarBrandDarkMode : styles.navbarBrand
            }
          >
            OneTech
          </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav className={styles.navbarLinkContainer}>
            <Link href="/device">
              <a
                className={styles.navbarLink}
                onClick={() => setDropDown(false)}
              >
                Devices
              </a>
            </Link>
            <Link href="/support">
              <a
                className={styles.navbarLink}
                onClick={() => setDropDown(false)}
              >
                Support
              </a>
            </Link>
            {user && innerWidth < 992 ? (
              <div className={styles.navbarLinkContainer}>
                <Link href={`/user/${user.id}`}>
                  <a
                    className={styles.navbarLink}
                    onClick={() => setDropDown(false)}
                  >
                    Account
                  </a>
                </Link>
              </div>
            ) : null}
            {!user ? (
              <div className={styles.navbarLinkContainer}>
                <Link href="/settings">
                  <a
                    className={styles.navbarLink}
                    onClick={() => setDropDown(false)}
                  >
                    Settings
                  </a>
                </Link>
              </div>
            ) : null}

            {user && innerWidth < 992 ? (
              <div className={styles.navbarLinkContainer}>
                <Link href="/notifications">
                  <a
                    className={styles.navbarLink}
                    onClick={() => setDropDown(false)}
                  >
                    Notifications
                  </a>
                </Link>
              </div>
            ) : null}
            {user ? null : (
              <Link href="/auth">
                <a
                  className={styles.navbarLink}
                  onClick={() => setDropDown(false)}
                >
                  Login
                </a>
              </Link>
            )}

            {user && innerWidth < 992 ? (
              <div className={styles.navbarLinkContainer}>
                <Link href="/device">
                  <a
                    className={styles.navbarLink}
                    onClick={() => setDropDown(false)}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            ) : null}
          </Nav>
        </Navbar.Collapse>
        {user && innerWidth >= 992 ? (
          <div className={styles.avatarContainer}>
            <Avatar
              className={styles.navbarAvatar}
              src={user.avatar}
              onClick={() => setDropDown(!dropdown)}
            />
            {unseen && unseen.length ? (
              <div className={styles.notificationIcon}>{unseen.length}</div>
            ) : null}
          </div>
        ) : null}
      </Navbar>
      {dropdown ? (
        <div
          className={
            !darkModeActive
              ? `${styles.dropdownMenu}`
              : `${styles.dropdownMenuDarkMode}`
          }
        >
          <Link href={`/user/${user?.id}`}>
            <p
              className={
                !darkModeActive
                  ? styles.dropdownItem
                  : styles.dropdownItemDarkMode
              }
              onClick={() => setDropDown(false)}
            >
              Account
            </p>
          </Link>
          <Link href={`/settings`}>
            <p
              className={
                !darkModeActive
                  ? styles.dropdownItem
                  : styles.dropdownItemDarkMode
              }
              onClick={() => setDropDown(false)}
            >
              Settings
            </p>
          </Link>

          <Link href={`/notifications`}>
            <p
              className={
                !darkModeActive
                  ? styles.dropdownItem
                  : styles.dropdownItemDarkMode
              }
              onClick={() => setDropDown(false)}
            >
              Notifications
            </p>
          </Link>

          <div className="divider divider-with-space" />
          <p
            className={
              !darkModeActive
                ? styles.dropdownItem
                : styles.dropdownItemDarkMode
            }
            onClick={() => {
              setDropDown(false);
              logoutMutation({
                update: (cache) => cache.evict({ fieldName: "me" }),
              }).then((res) => {
                const response = res.data?.logout;
                if (response?.status) {
                  router.push("/auth");
                } else {
                  alert(response?.message);
                }
              });
            }}
          >
            Logout
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
