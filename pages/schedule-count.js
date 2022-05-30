import { useState, useEffect } from "react";

export default function ScheduleCount() {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    fetch("/api/get-schedule-count")
      .then((r) => r.json())
      .then(setCounts);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 9,
        padding: 20,
        height: "100vh",
      }}
    >
      {counts.map((count) => (
        <div style={{ padding: 5 }}>{count}</div>
      ))}
    </div>
  );
}
