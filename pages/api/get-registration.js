import ddb from "./ddb";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";

export default async function handler(req, res) {
  const { email } = req.query;

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
    return res.json(registration);
  }
  if (email !== "undefined") {
    var params = {
      Key: {
        email: {
          S: email,
        },
      },
      TableName: "climate",
    };
    return new Promise((resolve, _) => {
      ddb.getItem(params, async function (err, data) {
        if (err) res.status(404).send();
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
  } else {
    res.status(405).end();
  }
}
