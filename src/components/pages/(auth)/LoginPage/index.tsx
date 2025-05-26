"use client";

import React, { useState } from "react";
import { Button, Input, Alert, Typography } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

const { Title } = Typography;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "info" | "error" | "success" | "warning"
  >("info");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setAlertMessage("");
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await user.getIdToken(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setAlertMessage("Logged in successfully");
      setAlertType("success");
      router.push("/dashboard");
    } catch (err: any) {
      setAlertMessage(err?.message || "Something went wrong while logging in");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Title level={3} className={styles.title}>Log in to your account</Title>

      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          showIcon
          className={styles.alert}
        />
      )}

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
        className={styles.input}
      />

      <Button
        type="primary"
        loading={loading}
        onClick={handleSubmit}
        className={styles.button}
      >
        Log in
      </Button>
    </div>
  );
}
