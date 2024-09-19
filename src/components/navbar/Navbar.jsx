"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar({ isSigned = false }) {
  const session = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Link href={session.status === "authenticated" ? "/tasksManagement" : "/"} className={styles.logo}>
        TODO
      </Link>
        {session.status === "authenticated" ? (
          <button className={styles.logout} onClick={handleSignOut}>
            Logout
          </button>
        ) : (
          <Image
            src="/user.png"
            width={70}
            height={70}
            alt="User Icon"
            priority
          />
        )}
    </div>
  );
}
