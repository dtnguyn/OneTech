import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Avatar, Divider } from "@material-ui/core";
import { useLogoutMutation } from "../generated/graphql";
import { client } from "../utils/withApollo";
import { Router, useRouter } from "next/router";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user, setUser } = useAuth();
  const [dropdown, setDropDown] = useState(false);
  const router = useRouter();
  const [logoutMutation, {}] = useLogoutMutation({
    client: client,
  });

  return (
    <div className={styles.container}>
      <Navbar collapseOnSelect expand="lg">
        {/* <Navbar.Brand href="#home" className={styles.navbarBrand}>
          OneTech
        </Navbar.Brand> */}
        <Link href="/">
          <a className={styles.navbarBrand}>OneTech</a>
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
        <div className={styles.dropdownMenu}>
          <Link href={`/user/${user?.id}`}>
            <p
              className={styles.dropdownItem}
              onClick={() => setDropDown(false)}
            >
              Account
            </p>
          </Link>

          <p className={styles.dropdownItem} onClick={() => setDropDown(false)}>
            Settings
          </p>
          <Divider />
          <p
            className={styles.dropdownItem}
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
