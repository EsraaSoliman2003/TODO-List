"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    // signIn("credentials", { email, password });
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // منع التوجيه التلقائي من next-auth
    });

    if (result?.ok) {
      // إذا كانت عملية تسجيل الدخول ناجحة
      router.push("/tasksManagement"); // توجيه المستخدم إلى "tasksManagement"
    } else {
      // إذا كانت عملية تسجيل الدخول فاشلة
      // يمكنك إضافة رسالة خطأ هنا إذا لزم الأمر
      console.error("Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google")
    router.push("/tasksManagement");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          required
        />
        <button type="submit" className={`${styles.button} ${styles.login}`}>
          Login
        </button>
      </form>
      <button className={styles.button} onClick={handleGoogleSignIn}>
        Login with Google
      </button>
      <Link className={styles.link} href="/register">
        Sign Up
      </Link>
    </div>
  );
}
