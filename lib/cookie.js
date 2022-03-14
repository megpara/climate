import { serialize } from "cookie";

const TOKEN_NAME = "api_token";
const REGISTER_TOKEN_NAME = "registered_token";
const MAX_AGE = 60 * 60 * 8;

function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    ...options,
  });
}

function setTokenCookie(res, token) {
  res.setHeader("Set-Cookie", [
    createCookie(TOKEN_NAME, token),
    createCookie("authed", true, { httpOnly: false }),
  ]);
}

function setRegisterTokenCookie(res, token) {
  res.setHeader("Set-Cookie", [createCookie(REGISTER_TOKEN_NAME, token)]);
}

function clearAuthCookies(res) {
  res.setHeader("Set-Cookie", [
    serialize(TOKEN_NAME, "", {
      maxAge: 0,
      path: "/",
    }),
    serialize("authed", "false", { maxAge: 0, path: "/" }),
  ]);
}

function getAuthToken(cookies) {
  return cookies[TOKEN_NAME];
}

function getRegisteredToken(cookies) {
  return cookies[REGISTER_TOKEN_NAME];
}

export default {
  setTokenCookie,
  getAuthToken,
  clearAuthCookies,
  setRegisterTokenCookie,
  getRegisteredToken,
};
