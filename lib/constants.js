export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://funaspect.party";

export const buttonText = {
  success: "Success",
  submit: "Submit",
  error: "Error",
  fetching: "Fetching",
};

export const errorMessages = {
  invalidEmail: "Your email is invalid",
};

export const successMessages = {
  email_exists:
    "You have already signed up! <br/> You will hear from us soon, don't worry.",
  signed_up: "Thank you for signing up!<br/> You will hear from us soon.",
};

export const endpoints = {
  climateSignup: "climate-signup",
  climateRegister: "register",
};

export const CONTENTFUL_NULL_FIELD = "null";
