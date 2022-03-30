import Contentful from "../../lib/contentful";
import ErrorPage from "next/error";
import Head from "next/head";
import SpeakerCard from "../../components/Speakers/SpeakerCard";
import Layout from "../../components/Layout";
import PageLayout from "../../components/PageLayout";
import styles from "../../styles/Speakers.module.css";

export default function Speaker({ speaker }) {
  if (!speaker) {
    return <ErrorPage status={404} />;
  }
  return (
    <PageLayout>
      <Head>
        <title>{speaker.name} - The West Coast Climate Crisis Symposium</title>
        <meta
          name="description"
          content={`${speaker.name} is a speaker at The West Coast Climate Crisis Symposium`}
        />
        <meta property="og:image" content={`https:${speaker.photoUrl}`} />
      </Head>
      <div className={styles.container}>
        <SpeakerCard speaker={speaker} />
      </div>
    </PageLayout>
  );
}

const c = new Contentful();

export async function getStaticPaths() {
  const allSpeakers = await c.getAllSpeakers();
  return {
    paths:
      allSpeakers?.map(
        // (speaker) => `/speaker/${speaker.name.toLowerCase().replace(/ /g, "-")}`
        (speaker) => `/speaker/${speaker.slug}`
      ) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const speaker = await c.getSpeakerBySlug(params.slug);
  return {
    props: {
      speaker: speaker[0] ?? null,
    },
  };
}
