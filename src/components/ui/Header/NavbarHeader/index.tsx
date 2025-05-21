import React from "react";
import styles from "./index.module.css";

export default function Index({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.profile}>
      <p className={styles.headerText}>{children}</p>
    </div>
  );
}
