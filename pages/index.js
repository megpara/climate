import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useRef } from "react";
import Column from "../components/Column.js";
import DonateButton from "../components/DonateButton.js";
import Layout from "../components/Layout.js";
import useScrolled from "../hooks/useScrolled.js";
import styles from "../styles/Home.module.css";
import mapImg from "../public/ucla_map.png";

const columns = [
  [
    "Environmental Justice",
    "Holding Polluters Accountable",
    "Water for Thirsty Lands",
    "The Aquatic Killing Fields",
  ],
  [
    "Regenerative Solutions",
    "New Ways to Tell Climate Stories",
    "Networking / Meeting with Editors",
    "And Much More",
  ],
];

export default function Home() {
  const sunsetRef = useRef();

  useEffect(() => {
    if (sunsetRef.current) {
      let frame = 0;
      let rotation = 0;
      function animate() {
        frame = requestAnimationFrame(animate);
        if (sunsetRef.current)
          sunsetRef.current.style.filter = `hue-rotate(${rotation}deg) brightness(.75)`;
        rotation += 2.5;
      }
      animate();
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Layout>
      <Hero ref={sunsetRef} />
      <Map />
      <Bottom registration={false} />
    </Layout>
  );
}

const Hero = forwardRef((_, sunsetRef) => {
  const scroll = useScrolled();
  const parkingGoogleMapsLink = "https://goo.gl/maps/NmwzGUB6Aw34cuAF6";
  const ackermanUnionGMapsLink = "https://goo.gl/maps/1AFRiK4bryHuSjcP9";
  return (
    <div className={styles.backgroundContainer}>
      <div
        className={`${styles.backgroundImage} ${styles.topBackgroundImage}`}
      />
      <div className={styles.backgroundImage2} ref={sunsetRef} />
      <div className={styles.mainContainer}>
        <div
          className={styles.eventDetails}
          style={{ position: "relative", padding: 0 }}
        >
          <div className={styles.logoContainer}>
            <img style={{ width: "100%" }} src={"wire.png"} />
          </div>
          <div>
            <div className={styles.boldSubtitle}>A Virtual/In-Person Event</div>
            <div className={styles.boldSubtitle}>UCLA Ackerman Union</div>
            <div className={styles.boldSubtitle}>June 4th 2022</div>
          </div>
        </div>
        <div className={styles.centerFlex}>
          <div className={styles.titleDiv}>
            <div
              className={"heading-2"}
              style={{ marginTop: 10, marginBottom: -5 }}
            >
              WELCOME!
            </div>
            <div
              className={styles.subtitle}
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              PARKING
            </div>
            <div className={styles.contentBlock}>
              <div>
                <a
                  href={parkingGoogleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#3c81ff", textDecoration: "underline" }}
                >
                  Park in Lot 4
                </a>
                , south (Entrance: Right on to Westwood Blvd, just off of Sunset
                (going east). It is hard to find parking kiosks to pay.
              </div>
              <div>
                To purchase parking with a mobile device, go to{" "}
                <a
                  href="https://parkmobile.io"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#3c81ff", textDecoration: "underline" }}
                >
                  ParkMobile.io
                </a>
              </div>
              <div>The parking zone is #2506.</div>
            </div>
            <div
              className={styles.subtitle}
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              REGISTRATION
            </div>
            <div className={styles.contentBlock}>
              <div>
                Tables in front of the Grand Ballroom on the second floor of
                <a
                  href={ackermanUnionGMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#3c81ff", textDecoration: "underline" }}
                >
                  {" "}
                  Ackerman Union
                </a>
              </div>
            </div>
            <div
              className={styles.subtitle}
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              MASKS AND VACCINATION CARDS REQUIRED
            </div>
            <div
              className={styles.subtitle}
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              WIFI
            </div>
            <div className={styles.contentBlock}>
              <div>Sign on to general UCLA Wi-Fi. No password required</div>
            </div>
            <div
              className={styles.subtitle}
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              LUNCH
            </div>
            <div className={styles.contentBlock}>
              <div>
                Food Court, First Floor: Veggie Grill, Panda Express, Rubio's,
                Carl's Junior
              </div>
            </div>
          </div>
        </div>
        {/* <AnimatePresence>
          {!scroll && (
            <motion.div
              className={styles.scrollContainer}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeOut", duration: "0.5" }}
            >
              <span className={styles.scroll}>(Scroll)</span>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
});

const Map = () => {
  return (
    <div style={{ background: "var(--green)", color: "white" }}>
      <div
        className={styles.boldSubtitle}
        style={{ fontSize: "1.5rem", textAlign: "center", padding: 10 }}
      >
        Map
      </div>
      <div
        style={{
          position: "relative",
          background: `url(${mapImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 500,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: 10,
            left: 0,
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#F7CA02",
          }}
        >
          UCLA
        </div>
        {/* <img style={{ width: "100%" }} src={mapImg.src} /> */}
      </div>
    </div>
  );
};

const Bottom = ({ registration = true }) => {
  const ackermanUnionLink = "https://map.ucla.edu/?k=false&id=103";
  const parkingLink = "https://map.ucla.edu/?k=false&id=79546";
  return (
    <>
      {registration && (
        <div className={styles.emailContainer}>
          <div className={styles.emailDiv}>
            <div className={styles.boldSubtitle}>
              Registration is open
              <br /> join us on June 4th at UCLA Ackerman Union!
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <button
                className={styles.mainButton}
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
      {!registration && (
        <div className={styles.emailContainer} style={{ padding: 20 }}>
          <div className={styles.contentContainer}>
            <div
              className={styles.contentBlock}
              style={{ fontWeight: "bold", padding: 10 }}
            >
              <div>
                Click{" "}
                <a
                  href="https://map.ucla.edu/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#F7CA02", textDecoration: "underline" }}
                >
                  here
                </a>{" "}
                to view an interactive map of UCLA
              </div>
            </div>
            <div
              className={styles.contentBlock}
              style={{ fontWeight: "bold", padding: 10 }}
            >
              <div className={styles.contentContainer}>
                Use the links below to navigate directly to the venue and
                parking
                <div>
                  <div style={{ textAlign: "center" }}>
                    <a
                      href={ackermanUnionLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#F7CA02",
                        textDecoration: "underline",
                        marginTop: 10,
                        display: "block",
                      }}
                    >
                      Ackerman Union
                    </a>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <a
                      href={parkingLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#F7CA02",
                        textDecoration: "underline",
                        marginTop: 10,
                        display: "block",
                      }}
                    >
                      Parking Structure 4
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.footer}>
        <div style={{ color: "var(--green)" }}>
          The event is free but donations help!
        </div>
        <DonateButton />

        <div className={styles.footerImgContainer}>
          <div>
            <img style={{ width: "100%" }} src={"science_literary_logo.png"} />
          </div>
          <div>
            <img style={{ width: "100%" }} src={"so-cal-science-writers.svg"} />
          </div>
        </div>
        <div className={styles.detail}>Organized by SoCal Science Writers</div>
        <div className={styles.detail}>
          Funded by a Grant from the Science Literacy Foundation
        </div>
      </div>
    </>
  );
};

const Features = () => {
  const router = useRouter();

  return (
    <div
      className={styles.backgroundContainer}
      style={{ height: "100vh" }}
      id="feature"
    >
      <div className={styles.featureContainer}>
        <div className={styles.featureDiv}>
          <div
            className={styles.title}
            style={{ letterSpacing: 5, color: "#02838a" }}
          >
            Featuring
          </div>
          <div className={styles.bulletPoints}>
            {columns.map((column) => {
              return <Column key={column} points={column} />;
            })}
          </div>
          {/* <div className={styles.smallText}>
            Speakers and program to be announced
          </div> */}
        </div>
      </div>
      {/* <EmailSignup /> */}
      <Bottom />
    </div>
  );
};
