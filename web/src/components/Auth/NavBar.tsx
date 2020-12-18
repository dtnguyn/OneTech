import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "../../styles/NavBar.module.css";
import Link from "next/link";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
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
          <Nav>
            <Link href="/device">
              <a className={styles.navbarLink}>Devices</a>
            </Link>
            <Link href="/about">
              <a className={styles.navbarLink}>About</a>
            </Link>
            <Link href="/auth">
              <a className={styles.navbarLink}>Login</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
