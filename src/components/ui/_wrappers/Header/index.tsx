import React from "react";
import styles from "./index.module.css";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.header}>
      <p className={styles.headerText}>{children}</p>
    </div>
  );
}
