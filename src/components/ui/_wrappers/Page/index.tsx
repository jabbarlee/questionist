import React from "react";
import styles from "./index.module.css";

export default function Page({ children }: { children: React.ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
