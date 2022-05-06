import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useRef } from "react";
import Column from "../components/Column.js";
import DonateButton from "../components/DonateButton.js";
import Layout from "../components/Layout.js";
import useScrolled from "../hooks/useScrolled.js";
import styles from "../styles/Home.module.css";

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
      <Features />
    </Layout>
  );
}

const Hero = forwardRef((_, sunsetRef) => {
  const scroll = useScrolled();
  return (
    <div className={styles.backgroundContainer}>
      <div
        className={`${styles.backgroundImage} ${styles.topBackgroundImage}`}
      />
      <div className={styles.backgroundImage2} ref={sunsetRef} />
      <div className={styles.mainContainer}>
        <div className={styles.eventDetails}>
          <div className={styles.logoContainer}>
            <img style={{ width: "100%" }} src={"wire.png"} />
          </div>
          <div>
            {/* <div className={styles.boldSubtitle}>Save the Date</div> */}
            <div className={styles.boldSubtitle}>A Virtual/In-Person Event</div>
            <div className={styles.boldSubtitle}>UCLA Ackerman Union</div>
            <div className={styles.boldSubtitle}>June 4th 2022</div>
          </div>
        </div>
        <div className={styles.centerFlex}>
          <div className={styles.titleDiv}>
            <div className={styles.title}>
              The West Coast Climate Crisis Symposium
            </div>
            <div className={styles.subtitle}>
              The IPCC Warns the World Will Become 'Unlivable' - But No One is
              Paying Attention. How Can We Break Through the Logjam of Denial
              and Disinformation? This day long conference will talk about the
              crucial role of journalists in offering solutions to the climate
              crisis
            </div>
          </div>
        </div>
        <AnimatePresence>
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
        </AnimatePresence>
      </div>
    </div>
  );
});

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
    </div>
  );
};
