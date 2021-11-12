import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.titleDiv}>
          <div className={styles.title}>
            The West Coast Climate Crisis Symposium
          </div>
          <div className={styles.subtitle}>
            The needed role of science journalists in effecting faster and more
            positive change in stopping the climate crisis
          </div>
          <div className={styles.introText}></div>
        </div>
      </div>
    </Layout>
  );
}
