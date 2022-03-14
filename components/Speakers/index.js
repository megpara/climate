import PageLayout from "../PageLayout";
import SpeakerCard from "./SpeakerCard";
import speakerStyles from "../../styles/Speakers.module.css";

export default function Speakers({ speakers }) {
  return (
    <PageLayout>
      <div className={speakerStyles.container}>
        {speakers.map((speaker) => {
          return <SpeakerCard key={speaker.name} speaker={speaker} />;
        })}
      </div>
    </PageLayout>
  );
}
