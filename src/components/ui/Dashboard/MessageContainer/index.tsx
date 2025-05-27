"use client";

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "antd";
import styles from "./index.module.css";
import { useCurrentUser } from "@/lib/context/UserContext";

export default function MessageContainer() {
  const { uid, name, email } = useCurrentUser();

  const [user, setUser] = useState<any>(null);

  const fetchUserData = async () => {
    try {
      console.log("Fetching user data for UID:", name);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      console.log("User data:", data.message);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserData();

      setUser(userData);
      console.log("User data fetched:", userData);
    };
    getUserData();
  }, [uid]);

  return (
    <div className={styles.container}>
      <Typography className={styles.heading} fontSize={"28px"}>
        Welcome back, {user?.name || "Guest"} 👋
      </Typography>
      <Typography className={styles.subheading} fontSize={"20px"}>
        Ready to ace your practice today?
      </Typography>
      <Button
        size="large"
        type="primary"
        href="/practice/create"
        style={{ textDecoration: "none", width: "100%" }}
      >
        Start practicing
      </Button>
    </div>
  );
}
