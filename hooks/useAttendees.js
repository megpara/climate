import useSWR from "swr";

function fetcher(route) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.json())
    .then((data) => {
      const attendeesMap = data.reduce((pv, cv) => {
        const emails = cv.attendees ? cv.attendees.SS : [];
        return { ...pv, [cv.slug.S]: emails };
      }, {});
      return attendeesMap;
    });
}

export default function useAttendees() {
  const {
    data: attendees,
    error,
    mutate,
  } = useSWR("/api/get-schedule", fetcher);

  return {
    attendees,
    error,
    mutate,
  };
}
