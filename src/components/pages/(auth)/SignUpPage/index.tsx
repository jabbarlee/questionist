"use client";

import React, { useState } from "react";
import { Input, Button, Typography, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import styles from "./index.module.css";

const { Title, Text } = Typography;

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSignUp = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const idToken = await user.getIdToken(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            idToken,
            name: values.name,
            email: values.email,
            role: "student",
          }),
        }
      );

      if (!res.ok) throw new Error("Session cookie creation failed");

      message.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      message.error(err?.message || "Something went wrong during sign-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Title className={styles.title}>Sign Up</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSignUp}
        requiredMark={false}
      >
        <Form.Item
          className={styles.formItem}
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter a password" },
            { min: 6, message: "Minimum 6 characters" },
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item className={styles.formItem}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={styles.submitButton}
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>

      <div className={styles.loginText}>
        <Text type="secondary">
          Already have an account?{" "}
          <a onClick={() => router.push("/login")}>Log in</a>
        </Text>
      </div>
    </div>
  );
}
