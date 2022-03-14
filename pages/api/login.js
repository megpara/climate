import { Magic } from "@magic-sdk/admin";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";

let magic = new Magic(process.env.MAGIC_SECRET);

export default async function handler(req, res) {
  if (req.method !== "POST" || !req.headers.authorization) {
    return res.status(405).end();
  }
  // exchange DID from Magic for some user data
  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  const user = await magic.users.getMetadataByToken(did);
  // author cookies to persist users session
  const token = await Iron.seal(
    user,
    process.env.ENCRYPTION_SECRET,
    Iron.defaults
  );
  CookieService.setTokenCookie(res, token);
  res.end();
}
