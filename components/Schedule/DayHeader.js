import styles from "../../styles/Schedule.module.css";

export default function DayHeader({ day }) {
  return <div className={styles.dayHeader}>June {day}th, 2022</div>;
}
