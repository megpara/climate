export default function useUserScheduleList() {
  const { attendees } = useAttendees();
  const { registration } = useAuth();
  const [userScheduleList, setUserScheduleList] = useState([]);

  useEffect(() => {
    if (!registration) {
      return;
    }
    const scheduleList = Object.keys(attendees).filter((slug) => {
      const itemAttendance = attendees[slug];
      console.log(itemAttendance);
      if (itemAttendance.includes(registration.email)) {
        return true;
      } else {
        return false;
      }
    });
    setUserScheduleList(scheduleList);
  }, [registration, attendees]);

  return userScheduleList;
}
