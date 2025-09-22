import React from "react";
import Image from "next/image";
import styles from "../page.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Next Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
