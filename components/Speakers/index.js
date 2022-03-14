import SpeakerCard from "./SpeakerCard";

export default function Speakers({ speakers }) {
  return (
    <div style={{ background: "red", display: "flex" }}>
      {speakers.map((speaker) => {
        return <SpeakerCard key={speaker.name} speaker={speaker} />;
      })}
    </div>
  );
}
