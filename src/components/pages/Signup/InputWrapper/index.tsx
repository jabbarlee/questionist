"use client";

import React, { useState } from "react";
import { Input, Button, Alert } from "antd";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    setAlertMessage("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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

      if (!res.ok) throw new Error("Session cookie creation failed");

      setAlertMessage("Account created successfully!");
      setAlertType("success");
      router.push("/dashboard");
    } catch (err: any) {
      setAlertMessage(err?.message || "Something went wrong during sign-up.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      />
      <Button loading={loading} onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
}
