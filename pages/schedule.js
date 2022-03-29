import Contentful from "../lib/contentful";
import Schedule from "../components/Schedule";
import useAttendees from "../hooks/useAttendees";
import useAuth from "../hooks/useAuth";
import PageLayout from "../components/PageLayout";

export default function SchedulePage({ schedule }) {
  const { attendees, mutate } = useAttendees();
  const { registration } = useAuth();
  return (
    <PageLayout>
      <Schedule
        schedule={schedule}
        attendees={attendees}
        registration={registration}
        mutate={mutate}
      />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const c = new Contentful();
  const schedule = await c.getAllScheduleEntries();
  return {
    props: {
      schedule,
    },
  };
}
