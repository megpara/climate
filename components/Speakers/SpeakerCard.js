import Link from "next/link";
export default function SpeakerCard({ speaker }) {
  return (
    <Link href={`/speaker/${speaker.name.toLowerCase().replace(/ /g, "-")}`}>
      <div style={{ flex: "0 0 20%", background: "white", margin: 10 }}>
        <div>{speaker.name}</div>
        <div>
          <img style={{ width: "100%" }} src={speaker.photoUrl} />
        </div>
        <div>{speaker.jobTitle}</div>
        <div>{speaker.description}</div>
      </div>
    </Link>
  );
}
