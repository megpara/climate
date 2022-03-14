import CookieService from "../../lib/cookie";
export default async (_, res) => {
  CookieService.clearAuthCookies(res);
  res.end();
};
