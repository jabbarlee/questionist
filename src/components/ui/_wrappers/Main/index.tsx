import React from "react";
import styles from "./index.module.css";

export default function ({
  children,
  marginLess,
}: {
  children: React.ReactNode;
  marginLess?: boolean;
}) {
  return (
    <div className={`${styles.main} ${marginLess ? styles.marginLess : ""}`}>
      {children}
    </div>
  );
}
