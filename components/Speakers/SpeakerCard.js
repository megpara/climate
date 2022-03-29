import Link from "next/link";
import cardStyles from "../../styles/SpeakerCard.module.css";
import useInView from "react-cool-inview";

export default function SpeakerCard({ speaker }) {
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
  });
  console.log(inView);
  return (
    <Link href={`/speaker/${speaker.name.toLowerCase().replace(/ /g, "-")}`}>
      <div className={cardStyles.card} ref={observe}>
        <div className={cardStyles.speakerName}>{speaker.name}</div>
        <div className={cardStyles.border}>
          {inView && (
            <img
              className={cardStyles.img}
              src={speaker.photoUrl + "?fit=fill&w=1080&h=1080"}
            />
          )}
          {/* <div style={{ position: "relative", width: 300, height: 300 }}>
            <ContentfulImage
              src={speaker.photoUrl}
              layout="responsive"
              width="300"
              height="300"
              className="rounded-full"
              alt={"name"}
            />
          </div> */}
          <div className={cardStyles.speakerText}>
            <div className={cardStyles.speakerTitle}>{speaker.jobTitle}</div>
            {/* <div>{speaker.description}</div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
