export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export const windowExists = typeof window !== "undefined";

export const getHost = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${
        windowExists ? window.location.host : "westcoastclimatecrisis.org"
      }`;
};
