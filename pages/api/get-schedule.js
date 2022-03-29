import ddb from "./ddb";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";

export default async function handler(req, res) {
  let registration;
  try {
    registration = await Iron.unseal(
      CookieService.getRegisteredToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (err) {
    console.log("no register cookie");
    res.end();
  }

  if (registration.email !== "undefined") {
    var params = {
      TableName: "schedule",
    };
    return new Promise((resolve, _) => {
      ddb.scan(params, async function (err, data) {
        if (err) res.status(404).send();
        res.json(data.Items);
        resolve();
      });
    });
  } else {
    res.status(405).end();
  }
}
