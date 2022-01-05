import { forwardRef, useEffect, useRef } from "react";
import Column from "../components/Column.js";
import EmailSignup from "../components/EmailSignup/index.js";
import Layout from "../components/Layout.js";
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
          <div style={{ width: 80, marginRight: 20 }}>
            <img style={{ width: "100%" }} src={"wire.png"} />
          </div>
          <div>
            <div className={styles.boldSubtitle}>Save the Date</div>
            <div className={styles.detail}>
              A Hybrid Virtual/In-Person Event
            </div>
            <div className={styles.detail}>UCLA/Los Angeles. June 4th 2022</div>
          </div>
        </div>
        <div className={styles.centerFlex}>
          <div className={styles.titleDiv}>
            <div className={styles.title}>
              The West Coast Climate Crisis Symposium
            </div>
            <div className={styles.subtitle}>
              A day-long conference about the crucial role of science
              journalists in offering solutions to the climate crisis
            </div>
          </div>
        </div>
        <div className={styles.scrollContainer}>
          <span className={styles.scroll}>(Scroll)</span>
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
          <div className={styles.smallText}>
            Speakers and program to be announced
          </div>
        </div>
      </div>
      <EmailSignup />
      <div className={styles.footer}>
        <div className={styles.footerImgContainer}>
          <div>
            <img style={{ width: "100%" }} src={"science_literary_logo.png"} />
          </div>
          <div>
            <img style={{ width: "100%" }} src={"nasw_logo.svg"} />
          </div>
        </div>
        <div className={styles.detail}>
          Organized by SoCal Science Writers (Regional Chapter of the NASW)
        </div>
        <div className={styles.detail}>
          Funded by a Grant from the Science Literacy Foundation
        </div>
      </div>
      {/* <div className={styles.footerLogoDiv}>
        <img className={styles.footerLogo} src="/square_logo.png" />
      </div> */}
    </div>
  );
};
