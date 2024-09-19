"use client"
import Link from "next/link";
import styles from "./page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session)
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Welcome To The TODO App</h1>
      <div className={styles.links}>
        <Link className={styles.link} href="/login">
          Login
        </Link>
        <Link className={styles.link} href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
