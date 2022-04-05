import { motion, useTransform, useViewportScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import navStyles from "../../styles/Nav.module.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const paths = [
  { link: "/", name: "Home" },
  { link: "/speakers", name: "Speakers" },
  { link: "/schedule", name: "Schedule" },
];

export default function Nav() {
  const router = useRouter();
  const { user } = useAuth();
  let currentPath = router.asPath;

  // Note: There is some home specific patching for layout
  const isHome = currentPath === "/";
  return (
    <div className={navStyles.nav}>
      <div className={navStyles.navColumn}>
        <a href="/">
          <div style={{ width: 80, marginRight: 20 }}>
            <img
              style={{
                width: "100%",
                display: isHome ? "none" : "block",
              }}
              src={"/wire.png"}
            />
          </div>
        </a>
      </div>
      <div className={`${navStyles.navColumn} ${navStyles.navColumn2}`}>
        <div
          className={`${navStyles.navItems} ${isHome ? navStyles.home : ""}`}
        >
          {paths.map((path) => (
            <Link key={path.name} href={path.link}>
              <div
                className={navStyles.navLink}
                style={{
                  borderBottom: currentPath === path.link && "1px solid white",
                  cursor: "pointer",
                }}
              >
                {path.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${navStyles.navColumn} ${navStyles.navColumn3} ${
          navStyles.wide
        } ${isHome ? navStyles.home : ""}`}
      >
        {/* TODO: Better reducer for user and regisration state*/}
        <div className={navStyles.navButtons}>
          {!user && (
            <>
              <div className={navStyles.primaryButton}>
                <Link href="/register">Register</Link>
              </div>
              <div className={navStyles.secondaryButton}>
                <Link href="/login">Login</Link>
              </div>
            </>
          )}
          {user && (
            <>
              <div className={navStyles.primaryButton}>
                <Link href="/register">Register</Link>
              </div>
              <div className={navStyles.secondaryButton}>
                <Link href="/login">Profile</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={navStyles.bottomNav}>
        {paths.map((path) => (
          <Link key={path.name} href={path.link}>
            <div
              className={currentPath === path.link ? navStyles.selected : ""}
              style={{
                background:
                  currentPath === path.link ? "var(--green)" : "var(--orange)",
                cursor: "pointer",
              }}
            >
              {path.name}
            </div>
          </Link>
        ))}
        {/* <div className={navStyles.navButtons}>
          <div className={navStyles.primaryButton}>
            <Link href="/register">Register</Link>
          </div>
          <div className={navStyles.secondaryButton}>
            <Link href="/login">Login</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
