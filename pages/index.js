import { forwardRef, useEffect, useRef } from "react";
import Column from "../components/Column.js";
import Layout from "../components/Layout.js";
import Wccc from "../components/Logos/Wccc.js";
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
  return (
    <div className={styles.backgroundContainer}>
      <div
        className={`${styles.backgroundImage} ${styles.topBackgroundImage}`}
      />
      <div className={styles.backgroundImage2} ref={sunsetRef} />

      <div className={styles.mainContainer}>
        <div className={styles.eventDetails}>
          <div style={{ width: 70, marginRight: 20 }}>
            <img style={{ width: "100%" }} src={"wccc_logo.png"} />
          </div>
          <div>
            <div className={styles.boldSubtitle}>Save the Date</div>
            <div className={styles.detail}>
              A Hybrid Virtual/In-Person Event
            </div>
            <div className={styles.detail}>
              UCLA/Los Angeles. March 19th 2022
            </div>
          </div>
        </div>
        <div className={styles.titleDiv}>
          <div className={styles.title}>
            The West Coast Climate Crisis Symposium
          </div>
          <div className={styles.subtitle}>
            A day-long conference about the crucial role of science journalists
            in offering solutions to the climate crisis
          </div>
        </div>
        <div>
          <button
            className={styles.mainButton}
            onClick={() => {
              const feature = document.getElementById("feature");
              const { top, height } = feature.getBoundingClientRect();
              window.scrollTo({ top, behavior: "smooth" });
            }}
          >
            Learn More
          </button>
        </div>
        <div className={styles.scrollContainer}>
          <span className={`${styles.detail} ${styles.scroll}`}>Scroll</span>
        </div>
      </div>
    </div>
  );
});

const Features = () => {
  return (
    <div
      className={styles.backgroundContainer}
      style={{ height: "100vh" }}
      id="feature"
    >
      <div
        className={`${styles.backgroundImage} ${styles.gradientBackground}`}
      />
      <div className={styles.mainContainer}>
        <div className={`${styles.contentWrapper} ${styles.flex}`}>
          <div className={styles.featureDiv}>
            <div className={styles.title} style={{ letterSpacing: 5 }}>
              Featuring
            </div>
            <div className={styles.bulletPoints}>
              {columns.map((column) => {
                return <Column key={column} points={column} />;
              })}
            </div>
            <div className={styles.smallText}>
              Speakers and program to be announced
            </div>
          </div>
          <div className={styles.greenLine} />
          <div className={styles.emailContainer}>
            <div className={styles.boldSubtitle}>
              Leave your email for more information
            </div>
            <input className={styles.emailInput} />
            <button className={styles.mainButton}>Submit</button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.detail}>
          Organized by SoCal Science Writers (Regional Chapter of the NASW)
        </div>
        <div className={styles.detail}>
          Funded by a Grant from the Science Literacy Foundation
        </div>
        <div className={styles.footerImgContainer}>
          <div>
            <img style={{ width: "100%" }} src={"science_literary_logo.png"} />
          </div>
          <div>
            <img style={{ width: "100%" }} src={"nasw_logo.svg"} />
          </div>
        </div>
      </div>
    </div>
  );
};
