import ddb from "./ddb";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";

export default async function handler(req, res) {
  // const { email } = req.query;
  const email = "undefined";
  let registration;
  try {
    registration = await Iron.unseal(
      CookieService.getRegisteredToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (err) {
    console.log("no register cookie");
  }
  // If there is a cookie, no need to go to DB
  // Will this have side effects?
  if (registration) {
    // return res.end();
    return res.json(registration);
  }

  let user;
  try {
    console.log("checking user");
    user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (error) {
    res.status(401).end();
  }
  if (!user) {
    res.status(401).end();
  }
  console.log(user);
  // if (email !== "undefined") {
  var params = {
    Key: {
      email: {
        S: user.email,
      },
    },
    TableName: "climate",
  };
  return new Promise((resolve, _) => {
    ddb.getItem(params, async function (err, data) {
      // console.log(data.email);
      if (err || data.email === undefined) {
        return res.status(404).end();
      }
      const { Item } = data;
      const registration = Object.keys(Item).reduce((pv, cv) => {
        return { ...pv, [cv]: Item[cv].S };
      }, {});
      const token = await Iron.seal(
        registration,
        process.env.ENCRYPTION_SECRET,
        Iron.defaults
      );

      CookieService.setRegisterTokenCookie(res, token);
      res.json(registration);
      resolve();
    });
  });
  // } else {
  //   res.status(405).end();
  // }
}
