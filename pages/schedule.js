import Contentful from "../lib/contentful";
import Schedule from "../components/Schedule";

export default function SchedulePage({ schedule }) {
  return <Schedule schedule={schedule} />;
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
