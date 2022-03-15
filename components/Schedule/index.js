import PageLayout from "../PageLayout";
import DayHeader from "./DayHeader";
import ScheduleItem from "./Item";
import styles from "../../styles/Schedule.module.css";

export default function Schedule({ schedule }) {
  let day;
  let prevDay;
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.schedule}>
          {schedule.map((item) => {
            const time = new Date(item.time);
            day = time.getDate();
            const showDay = day !== prevDay;
            prevDay = day;
            return (
              <div key={item.title}>
                {showDay && <DayHeader day={day} />}
                <ScheduleItem item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
