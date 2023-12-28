import React from "react";
import styles from './Nav.module.css';
import { FaBell } from "react-icons/fa";

export default function Navigation() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src="/images/Logo(2).png" alt="logo" width={40} height={50} />
      </div>
      <div className={styles.nav}>
        <FaBell className={styles.icon} />
        <img src="/images/user image.png" alt="user" width={50} height={50} />
        <div className={styles.header}>
          <h3>Lisa</h3>
          <p>Operator</p>
        </div>
      </div>
    </div>
  );
}
