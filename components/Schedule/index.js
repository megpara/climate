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
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {showDay ? `June ${day}th` : ""}
            </div>
            <div>
              {time.getHours()} - {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}
