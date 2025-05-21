import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import Button from "../Button";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.overlay}>
        <p className={styles.title}>Questionist</p>
        <p className={styles.subtitle}>Ask your questions, in a style.</p>
        <div className={styles.buttonGroup}>
          <Button
            // redirect="/explore"
            buttonType="primary"
          >
            How it works
          </Button>

          <Button
            // redirect="/explore"
            buttonType="secondary"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
