import Login from "../components/Login";
import Contentful from "../lib/contentful";

export default function LoginPage({ schedule }) {
  return <Login schedule={schedule} />;
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
