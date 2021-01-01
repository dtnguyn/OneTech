import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Avatar, Divider } from "@material-ui/core";
import UserDropdown from "./UserDropdown";
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
              <a className={styles.navbarLink}>Devices</a>
            </Link>
            <Link href="/about">
              <a className={styles.navbarLink}>About</a>
            </Link>
            {user ? null : (
              <Link href="/auth">
                <a className={styles.navbarLink}>Login</a>
              </Link>
            )}

            {user && innerWidth < 992 ? (
              <div className={styles.navbarLinkContainer}>
                <Link href="/device">
                  <a className={styles.navbarLink}>Account</a>
                </Link>
              </div>
            ) : null}
            {user && innerWidth < 992 ? (
              <div className={styles.navbarLinkContainer}>
                <Link href="/device">
                  <a className={styles.navbarLink}>Settings</a>
                </Link>
              </div>
            ) : null}
            {user && innerWidth < 992 ? (
              <div className={styles.navbarLinkContainer}>
                <Link href="/device">
                  <a className={styles.navbarLink}>Logout</a>
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
          <p className={styles.dropdownItem}>Account</p>
          <p className={styles.dropdownItem}>Settings</p>
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
