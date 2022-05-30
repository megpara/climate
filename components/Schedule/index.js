import DayHeader from "./DayHeader";
import ScheduleItem from "./Item";

import styles from "../../styles/Schedule.module.css";
import Separator from "../Separator";
import { useState } from "react";
import List from "./List";

export default function Schedule({
  schedule,
  attendees = {},
  registration = null,
  mutate,
}) {
  const [showUsersList, setShowUsersList] = useState(false);
  let day;
  let prevDay;

  const scheduleFilter = (item) => {
    if (!showUsersList) {
      return true;
    } else if (attendees[item.slug]) {
      return attendees[item.slug].includes(registration.email);
    }
  };
  if (showUsersList) {
    return (
      <>
        <div
          style={{
            textAlign: "center",
            fontSize: "1.3rem",
            margin: 10,
            color: "white",
          }}
        >
          Your schedule
        </div>
        <button
          className="smallButton"
          style={{ margin: 20, backgroundColor: "red", color: "white" }}
          onClick={() => {
            setShowUsersList(!showUsersList);
          }}
        >
          {!showUsersList ? "Only see my schedule" : "See entire schedule"}
        </button>
        <List
          schedule={schedule}
          registration={registration}
          attendees={attendees}
        />
      </>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.schedule}>
        {schedule.filter(scheduleFilter).map((item) => {
          const time = new Date(item.time);
          day = time.getDate();
          const showDay = day !== prevDay;
          prevDay = day;

          return (
            <div key={item.title}>
              {showDay && (
                <>
                  <DayHeader day={day} />
                  <button
                    className="smallButton"
                    onClick={() => {
                      setShowUsersList(!showUsersList);
                    }}
                  >
                    {!showUsersList
                      ? "Only see my schedule"
                      : "See entire schedule"}
                  </button>
                  <Separator marginBottom={20} />
                </>
              )}
              <ScheduleItem
                item={item}
                attendees={attendees[item.slug]}
                registration={registration}
                mutate={mutate}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
