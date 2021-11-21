import { useEffect, useRef } from "react";
import Column from "../components/Column.js";
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
        rotation += 5;
      }
      animate();
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Layout>
      <div className={styles.backgroundContainer}>
        <div
          className={`${styles.backgroundImage} ${styles.topBackgroundImage}`}
        />
        <div className={styles.backgroundImage2} ref={sunsetRef} />

        <div className={styles.mainContainer}>
          <div className={styles.eventDetails}>
            <div className={styles.boldSubtitle}>Save the Date</div>
            <div className={styles.detail}>
              A Hybrid Virtual/In-Person Event
            </div>
            <div className={styles.detail}>
              UCLA/Los Angeles. March 19th, 8:00am - 5:30pm.
            </div>
          </div>
          <div className={styles.titleDiv}>
            <div className={styles.title}>
              The West Coast Climate Crisis Symposium
            </div>
            <div className={styles.subtitle}>
              The crucial role of science journalists in offering solutions to
              stop the climate crisis.
            </div>
          </div>
          <div className={styles.scrollContainer}>
            <span className={`${styles.detail} ${styles.scroll}`}>Scroll</span>
          </div>
        </div>
      </div>
      <div className={styles.backgroundContainer}>
        <div
          className={`${styles.backgroundImage} ${styles.gradientBackground}`}
        />
        <div className={styles.mainContainer}>
          <div className={`${styles.contentWrapper} ${styles.flex}`}>
            <div className={styles.featureDiv}>
              <div className={styles.title}>Featuring</div>
              <div className={styles.bulletPoints}>
                {columns.map((column) => {
                  return <Column key={column} points={column} />;
                })}
              </div>
              <div className={styles.smallText}>
                Speakers and program to be announced.
              </div>
            </div>
            <div className={styles.emailContainer}>
              <div className={styles.boldSubtitle}>
                Sign up for our mailing list for more information.
              </div>
              <input className={styles.emailInput} />
              <button className={styles.mainButton}>Submit</button>
            </div>
            <div className={styles.footer}>
              <div className={styles.detail}>
                Organized by SoCal Science Writers (Regional Chapter of the
                NASW)
              </div>
              <div className={styles.detail}>
                Funded by a Grant from the Science Literacy Foundation
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
