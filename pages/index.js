import { useEffect, useRef } from "react";
import Layout from "../components/Layout.js";
import styles from "../styles/Home.module.css";

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
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundImage2} ref={sunsetRef} />

      <div className={styles.container}>
        <div className={styles.eventDetails}>
          <div className={styles.detail}>Los Angeles, UCLA</div>
          <div className={`${styles.detail} ${styles.detailCenter}`}>
            March 19, 2022
          </div>
          <div className={`${styles.detail} ${styles.detailRight}`}>
            9am - 6pm
          </div>
        </div>
        <div className={styles.titleDiv}>
          <div className={styles.title}>
            The West Coast Climate Crisis Symposium
          </div>
          <div className={styles.subtitle}>
            The needed role of science journalists in effecting faster and more
            positive change in stopping the climate crisis
          </div>
          <div className={styles.emailTitle}>Sign up for our mailing list</div>
          <input className={styles.emailInput} />
          <button className={styles.mainButton}>Submit</button>
          {/* <button className={styles.mainButton}>View the lineup</button> */}
        </div>
      </div>
    </Layout>
  );
}
