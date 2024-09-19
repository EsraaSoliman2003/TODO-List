import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div>My TODO list</div>
      <div>©2024 All rights reserved.</div>
    </div>
  );
}
