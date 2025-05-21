"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./index.module.css";
import { Button } from "antd";
import {
  Dashboard,
  Function,
  Report,
  Arrow,
  Reward,
} from "@/data/icons/navbar";
import { AccountCard } from "@/components/ui/AccountCard";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navHeader}>
        <p className={styles.navText}>Questionist</p>
      </div>
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTopWrapper}>
          <div className={styles.linksWrapper}>
            <div className={styles.linkWrapper}>
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <div
                  className={`${styles.textWrapper} ${
                    pathname === "/dashboard" ? styles.active : ""
                  }`}
                >
                  <Dashboard
                    className={
                      pathname === "/dashboard"
                        ? styles.iconActive
                        : styles.icon
                    }
                  />
                  <p
                    className={`${styles.linkText} ${
                      pathname === "/dashboard" ? styles.activeText : ""
                    }`}
                  >
                    Dashboard
                  </p>
                </div>
              </Link>
            </div>
            <div className={styles.linkWrapper}>
              <Link href="/practice" style={{ textDecoration: "none" }}>
                <div
                  className={`${styles.textWrapper} ${
                    pathname === "/practice" ? styles.active : ""
                  }`}
                >
                  <Function
                    className={
                      pathname === "/practice" ? styles.iconActive : styles.icon
                    }
                  />
                  <p
                    className={`${styles.linkText} ${
                      pathname === "/practice" ? styles.activeText : ""
                    }`}
                  >
                    Practice
                  </p>
                </div>
              </Link>
            </div>
            <div className={styles.linkWrapper}>
              <Link href="/results" style={{ textDecoration: "none" }}>
                <div
                  className={`${styles.textWrapper} ${
                    pathname === "/results" ? styles.active : ""
                  }`}
                >
                  <Report
                    className={
                      pathname === "/results" ? styles.iconActive : styles.icon
                    }
                  />
                  <p
                    className={`${styles.linkText} ${
                      pathname === "/results" ? styles.activeText : ""
                    }`}
                  >
                    Results
                  </p>
                </div>
              </Link>
            </div>
            <div className={styles.linkWrapper}>
              <Link href="/contracts" style={{ textDecoration: "none" }}>
                <div
                  className={`${styles.textWrapper} ${
                    pathname === "/contracts" ? styles.active : ""
                  }`}
                >
                  <Arrow
                    className={
                      pathname === "/contracts"
                        ? styles.iconActive
                        : styles.icon
                    }
                  />
                  <p
                    className={`${styles.linkText} ${
                      pathname === "/contracts" ? styles.activeText : ""
                    }`}
                  >
                    Contracts
                  </p>
                </div>
              </Link>
            </div>
            <div className={styles.linkWrapper}>
              <Link href="/rewards" style={{ textDecoration: "none" }}>
                <div
                  className={`${styles.textWrapper} ${
                    pathname === "/rewards" ? styles.active : ""
                  }`}
                >
                  <Reward
                    className={
                      pathname === "/rewards" ? styles.iconActive : styles.icon
                    }
                  />
                  <p
                    className={`${styles.linkText} ${
                      pathname === "/rewards" ? styles.activeText : ""
                    }`}
                  >
                    Rewards
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.footerTextWrapper}>
            <p className={styles.footerHeading}>Upgrade to PRO features</p>
            <p className={styles.footerSubheading}>
              Unlock unlimited practice sets, test analysis, and more
            </p>
          </div>
          <div className={styles.startTrialButton}>
            <Button variant="solid" className={styles.buttonTrial}>
              Start 30 day trial
            </Button>
          </div>
        </div>
        <div className={styles.accountCard}>
          <AccountCard />
        </div>
      </div>
    </nav>
  );
}
