export default function Separator({ marginBottom = 0 }) {
  return (
    <div
      style={{
        width: "100%",
        height: 20,
        background: "white",
        marginTop: 20,
        marginBottom,
      }}
    ></div>
  );
}
