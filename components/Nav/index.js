import Link from "next/link";
import { useRouter } from "next/router";
import navStyles from "../../styles/Nav.module.css";

const paths = [
  { link: "/", name: "Home" },
  { link: "/speakers", name: "Speakers" },
  { link: "/schedule", name: "Schedule" },
];

export default function Nav() {
  const router = useRouter();
  let currentPath = router.asPath;

  return (
    <div className={navStyles.nav}>
      <div className={navStyles.navColumn}>
        <a href="/">
          <div style={{ width: 80, marginRight: 20 }}>
            <img style={{ width: "100%" }} src={"wire.png"} />
          </div>
        </a>
      </div>
      <div className={navStyles.navColumn}>
        <div className={navStyles.navItems}>
          {paths.map((path) => (
            <Link href={path.link}>
              <div
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
      <div className={navStyles.navColumn}>
        <div className={navStyles.navButtons}>
          <div className={navStyles.primaryButton}>
            <Link href="/register">Register</Link>
          </div>
          <div className={navStyles.secondaryButton}>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
