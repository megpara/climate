import Link from "next/link";
import navStyles from "../../styles/Nav.module.css";

export default function Nav() {
  return (
    <div className={navStyles.nav}>
      <div className={navStyles.navColumn}>
        {" "}
        <div style={{ width: 80, marginRight: 20 }}>
          <img style={{ width: "100%" }} src={"wire.png"} />
        </div>
      </div>
      <div className={navStyles.navColumn}>
        <div className={navStyles.navItems}>
          <Link href="/">Home</Link>
          <Link href="/speakers">Speakers</Link>
          <Link href="/schedule">Schedule</Link>
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
