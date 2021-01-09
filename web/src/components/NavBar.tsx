import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Avatar, Divider } from "@material-ui/core";
import { useLogoutMutation } from "../generated/graphql";
import { client } from "../utils/withApollo";
import { Router, useRouter } from "next/router";
import { useDarkMode } from "next-dark-mode";
import { useAlert } from "react-alert";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user, setUser } = useAuth();
  const [dropdown, setDropDown] = useState(false);
  const { error: alert } = useAlert();
  const router = useRouter();
  const [logoutMutation, {}] = useLogoutMutation({
    client: client,
  });
  const { darkModeActive } = useDarkMode();

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
            <Link href="/about">
              <a
                className={styles.navbarLink}
                onClick={() => setDropDown(false)}
              >
                About
              </a>
            </Link>
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
            {user && innerWidth < 992 ? (
              <div className={styles.navbarLinkContainer}>
                <Link href="/device">
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
          <Avatar
            className={styles.navbarAvatar}
            src={user.avatar}
            onClick={() => setDropDown(!dropdown)}
          />
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

          <Divider />
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
