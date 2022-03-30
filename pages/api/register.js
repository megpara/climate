import ddb from "./ddb";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";

export default async function handler(req, res) {
  // unsafe
  const registration = req.body;

  const Item = Object.keys(registration).reduce((pv, cv) => {
    return { ...pv, [cv]: { S: req.body[cv] } };
  }, {});
  var params = {
    TableName: "climate",
    Item,
  };

  const token = await Iron.seal(
    registration,
    process.env.ENCRYPTION_SECRET,
    Iron.defaults
  );
  CookieService.setRegisterTokenCookie(res, token);

  return new Promise((resolve, _) => {
    ddb.putItem(params, function (err, data) {
      if (err) {
        res.status(405).json({ success: false });
        console.log("Error", err);
      } else {
        console.log("Success", data);
        res.json({ success: true, message: "registration_success" });
      }
      // res.end();
      resolve();
    });
  });
}
