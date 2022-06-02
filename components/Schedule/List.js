import ScheduleItem from "./Item";
import styles from "../../styles/Schedule.module.css";
import { useState } from "react";
import { format } from "date-fns";

export default function List({
  schedule,
  attendees = {},
  registration = null,
}) {
  const [showUsersList, setShowUsersList] = useState(true);
  let day;
  let prevDay;

  const scheduleFilter = (item) => {
    if (!showUsersList) {
      return true;
    } else if (attendees[item.slug]) {
      return attendees[item.slug].includes(registration.email);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.schedule}>
        {schedule.filter(scheduleFilter).map((item) => {
          const time = new Date(item.time);
          const timeEnd = new Date(item.timeEnd);
          day = time.getDate();
          const showDay = day !== prevDay;
          prevDay = day;
          console.log(item.room);
          return (
            <div key={item.title} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {item.title}
              </div>
              <div>
                {format(time, "h:mmaaaaa'm'")} -{" "}
                {format(timeEnd, "h:mmaaaaa'm'")}
              </div>
              <div className={styles.room}>
                {item.room !== "null" && _.startCase(item.room)}
              </div>
              {/* <ScheduleItem
                item={item}
                attendees={attendees[item.slug]}
                registration={registration}
                mutate={mutate}
              /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
