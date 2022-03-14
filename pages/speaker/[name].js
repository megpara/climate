import Contentful from "../../lib/contentful";
import ErrorPage from "next/error";
import Head from "next/head";
import SpeakerCard from "../../components/Speakers/SpeakerCard";

export default function Speaker({ speaker }) {
  if (!speaker) {
    return <ErrorPage status={404} />;
  }
  return (
    <div>
      <Head>
        <title>{speaker.name} - The West Coast Climate Crisis Symposium</title>
        <meta
          name="description"
          content={`${speaker.name} is a speaker at The West Coast Climate Crisis Symposium`}
        />
        <meta property="og:image" content={speaker.photoUrl} />
      </Head>
      <SpeakerCard speaker={speaker} />
    </div>
  );
}

const c = new Contentful();

export async function getStaticPaths() {
  const allSpeakers = await c.getAllSpeakers();
  return {
    paths:
      allSpeakers?.map(
        (speaker) => `/speaker/${speaker.name.toLowerCase().replace(/ /g, "-")}`
      ) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const speaker = await c.getSpeakerByName(params.name);
  return {
    props: {
      speaker: speaker[0] ?? {},
    },
  };
}
