import PageLayout from "../PageLayout";
import SpeakerCard from "./SpeakerCard";

export default function Speakers({ speakers }) {
  return (
    <PageLayout>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {speakers.map((speaker) => {
          return <SpeakerCard key={speaker.name} speaker={speaker} />;
        })}
      </div>
    </PageLayout>
  );
}
