import Link from "next/link";
import cardStyles from "../../styles/SpeakerCard.module.css";

export default function SpeakerCard({ speaker }) {
  return (
    <Link href={`/speaker/${speaker.name.toLowerCase().replace(/ /g, "-")}`}>
      <div className={cardStyles.card}>
        <div className={cardStyles.speakerName}>{speaker.name}</div>
        <div className={cardStyles.border}>
          <img style={{ width: "100%" }} src={speaker.photoUrl} />
          <div className={cardStyles.speakerText}>
            <div className={cardStyles.speakerTitle}>{speaker.jobTitle}</div>
            <div>{speaker.description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
