"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>
        Hotel Admin
      </h2>

      <nav className={styles.nav}>

        <Link
          href="/"
          className={
            pathname === "/"
              ? styles.active
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          href="/reservations"
          className={
            pathname === "/reservations"
              ? styles.active
              : ""
          }
        >
          Reservations
        </Link>

        <Link
          href="/rooms"
          className={
            pathname === "/rooms"
              ? styles.active
              : ""
          }
        >
          Rooms
        </Link>

        <Link
          href="/housekeeping"
          className={
            pathname === "/housekeeping"
              ? styles.active
              : ""
          }
        >
          Housekeeping
        </Link>

        <Link
          href="/staff"
          className={
            pathname === "/staff"
              ? styles.active
              : ""
          }
        >
          Staff
        </Link>

        <Link
          href="/reports"
          className={
            pathname === "/reports"
              ? styles.active
              : ""
          }
        >
          Reports
        </Link>

        <Link
          href="/settings"
          className={
            pathname === "/settings"
              ? styles.active
              : ""
          }
        >
          Settings
        </Link>

      </nav>
    </aside>
  );
}