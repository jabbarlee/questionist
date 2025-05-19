"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Input, Alert } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        }
      );

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
    <div className={styles.inputWrapper}>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
      />
      <Button
        onClick={handleSubmit}
        loading={loading}
        color="primary"
        variant="solid"
      >
        Log in
      </Button>
    </div>
  );
}
