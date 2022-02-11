export default function Speakers({ speakers }) {
  console.log(speakers);
  return (
    <div style={{ background: "red", display: "flex" }}>
      {speakers.map((speaker) => {
        return (
          <div
            style={{ flex: "0 0 20%", background: "white", margin: 10 }}
            key={speaker.name}
          >
            <div>{speaker.name}</div>
            <div>
              <img style={{ width: "100%" }} src={speaker.photoUrl} />
            </div>
            <div>{speaker.jobTitle}</div>
            <div>{speaker.description}</div>
          </div>
        );
      })}
    </div>
  );
}
