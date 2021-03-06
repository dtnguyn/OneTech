import { Avatar } from "@material-ui/core";
import { useDarkMode } from "next-dark-mode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Nav, Navbar } from "react-bootstrap";
import socketIOClient from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import {
  Notification,
  useLogoutMutation,
  useNotificationsQuery,
} from "../generated/graphql";
import styles from "../styles/NavBar.module.css";
import useWindowDimensions from "../utils/useWindowDimensions";
import { client } from "../utils/withApollo";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user } = useAuth();
  const [dropdown, setDropDown] = useState(false);
  const { error: alert } = useAlert();

  const router = useRouter();
  const [unseen, setUnseen] = useState<Notification[]>([]);
  const [logoutMutation, {}] = useLogoutMutation({
    client: client,
  });
  const { data, error, refetch } = useNotificationsQuery({
    variables: { unseen: true },
    client,
  });
  const { darkModeActive } = useDarkMode();

  const {} = useWindowDimensions();

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_SERVER_URL as string);
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

    if (arr) {
      if (user?.setting?.notifications) {
        setUnseen(arr);
      } else {
        setUnseen([]);
      }
    }
  }, [data, user]);

  return (
    <div className={styles.container}>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant={darkModeActive ? `dark` : "light"}
      >
        <Link href="/">
          <div className={styles.navbarBrandContainer}>
            <img src="/images/logo.png" className={styles.navbarLogo} />
            <a
              className={
                darkModeActive ? styles.navbarBrandDarkMode : styles.navbarBrand
              }
            >
              OneTech
            </a>
          </div>
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
            {!user || innerWidth < 992 ? (
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
