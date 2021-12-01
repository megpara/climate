const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://funaspect.party";

export const climateSignup = (email) => {
  return fetch(`${url}/climate-signup`, {
    method: "POST",
    body: JSON.stringify({ email }),
  }).then((r) => r.json());
};
