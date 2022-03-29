import dynamic from "next/dynamic";
import PageLayout from "../PageLayout";
// import SpeakerCard from "./SpeakerCard";
import styles from "../../styles/Speakers.module.css";

const SpeakerCard = dynamic(() => import("./SpeakerCard"));

export default function Speakers({ speakers }) {
  return (
    <PageLayout>
      <div className={styles.container}>
        {speakers.map((speaker) => {
          return <SpeakerCard key={speaker.name} speaker={speaker} />;
        })}
      </div>
    </PageLayout>
  );
}
