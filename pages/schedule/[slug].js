import ScheduleItem from "../../components/Schedule/Item";
import Contentful from "../../lib/contentful";
import ErrorPage from "next/error";
export default function ({ entry }) {
  if (!entry) {
    return <ErrorPage status={404} />;
  }
  return <ScheduleItem item={entry} />;
}

const c = new Contentful();

export async function getStaticPaths() {
  const allSchedules = await c.getAllScheduleEntries();
  return {
    paths: allSchedules?.map((schedule) => `/schedule/${schedule.slug}`) ?? [],
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const entry = await c.getScheduleEntryBySlug(params.slug);
  return {
    props: {
      entry: entry[0],
    },
  };
}
