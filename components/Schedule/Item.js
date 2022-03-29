import { format } from "date-fns";
import styles from "../../styles/ScheduleItem.module.css";
import { useEffect, useState } from "react";

const scheduleRequest = (slug, method) =>
  fetch("/api/schedule-register", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });

export default function ScheduleItem({
  item,
  attendees,
  registration = null,
  mutate,
}) {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (attendees) {
      setIsRegistered(
        registration && attendees && attendees.includes(registration.email)
      );
    }
  }, [attendees]);

  const time = new Date(item.time);
  const register = () => {
    scheduleRequest(item.slug, "put").then(() => {
      mutate("/api/get-schedule");
    });
  };

  const remove = () => {
    scheduleRequest(item.slug, "delete").then(() => {
      mutate("/api/get-schedule");
    });
  };
  // console.log(attendees);
  // const isRegistered =
  //   registration && attendees && attendees.includes(registration.email);

  return (
    // <Link href={`/schedule/${item.slug}`}>
    <div style={{ background: isRegistered ? "black" : "red" }}>
      <div>
        <div className={styles.time}>{format(time, "h:mmbb")}</div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.description}>{item.description}</div>
      </div>
      <div>
        {!isRegistered && <button onClick={register}>register</button>}
        {isRegistered && <button onClick={remove}>remove</button>}
      </div>
    </div>
    // </Link>
  );
}
