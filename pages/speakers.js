import Contentful from "../lib/contentful";
import Speakers from "../components/Speakers";

export default function SpeakersPage({ speakers }) {
  return <Speakers speakers={speakers} />;
}

export async function getStaticProps() {
  const c = new Contentful();
  const speakers = await c.getAllSpeakers();
  return {
    props: {
      speakers,
    },
  };
}
