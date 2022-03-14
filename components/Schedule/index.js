import DayHeader from "./DayHeader";
import ScheduleItem from "./Item";

export default function Schedule({ schedule }) {
  let day;
  let prevDay;
  return (
    <div style={{ background: "yellow" }}>
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
  );
}
