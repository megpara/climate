import styles from "../styles/Column.module.css";

export default function Column({ points }) {
  return (
    <div className={styles.column}>
      {points.map((point) => {
        return <div key={point} className={styles.bullet}>{point}</div>;
      })}
    </div>
  );
}
