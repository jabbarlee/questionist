"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { LevelProgress } from "./LevelProgress";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase"; // Firestore configuration
import { UserData } from "@/types";
import Link from "next/link";
import { useCurrentUser } from "@/lib/context/UserContext";

export function AccountCard() {
  const { uid, name, email } = useCurrentUser();

  return (
    <div className={styles.container}>
      <Typography className={styles.fullNameText}>
        <Link
          href={"/account"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {name}
        </Link>
      </Typography>
    </div>
  );
}
