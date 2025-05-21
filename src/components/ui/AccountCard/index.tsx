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
  const { uid } = useCurrentUser();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [levelThresholds, setLevelThresholds] = useState<{
    lowerBound: number;
    upperBound: number;
  }>({ lowerBound: 0, upperBound: 0 });

  // Fetch level thresholds from Firestore
  const fetchLevelThreshold = async (currentLevel: number) => {
    const configDocRef = doc(db, "appConfig", "levelBadges");
    const configDoc = await getDoc(configDocRef);

    if (configDoc.exists()) {
      const levelBadges = configDoc.data().levelBadges;

      if (levelBadges && Array.isArray(levelBadges)) {
        const currentLevelBadge = levelBadges.find(
          (badge: any) => badge.level === currentLevel
        );
        const nextLevelBadge = levelBadges.find(
          (badge: any) => badge.level === currentLevel + 1
        );

        const lowerBound = currentLevelBadge?.reward.axp || 0;
        const upperBound = nextLevelBadge?.reward.axp || lowerBound + 100; // Default increment
        return { lowerBound, upperBound };
      }
    }

    return { lowerBound: 0, upperBound: 100 }; // Fallback
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      const userDocRef = doc(db, "users", uid);

      const unsubscribe = onSnapshot(userDocRef, async (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const user = {
            name: data.name || "User",
            email: data.email || "",
            role: data.role || "student",
            uid: data.uid,
            createdAt: data.createdAt.toDate().toLocaleDateString(),
            level: data.level || 1,
            axp: data.axp || 0,
            axpToNextLevel: data.axpToNextLevel || 0,
            progressToNextLevel: data.progressToNextLevel || 0,
            brilliants: data.brilliants || 0,
          };

          setUserData(user);

          // Fetch thresholds for the user's current level
          const thresholds = await fetchLevelThreshold(user.level);
          setLevelThresholds(thresholds);
        }
      });

      return () => unsubscribe(); // Cleanup listener on component unmount
    };

    fetchAndSetData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.accountInfoWrapper}>
        <div className={styles.accountInfo}>
          <div className={styles.fullName}>
            <Typography className={styles.fullNameText}>
              <Link
                href={"/account"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {userData.name}
              </Link>
            </Typography>
          </div>
        </div>
        <div className={styles.levelNum}>
          <Typography className={styles.levelNumText}>
            Level {userData.level}
          </Typography>
        </div>
      </div>
      <div className={styles.progressInfo}>
        <div className={styles.progressBar}>
          <LevelProgress
            currentAxp={userData.axp || 0}
            axpToNextLevel={userData.axpToNextLevel || 0}
            currentLevelThreshold={levelThresholds}
          />
        </div>
      </div>
    </div>
  );
}
