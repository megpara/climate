import ddb from "./ddb";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";

export default async function handler(req, res) {
  const { slug } = req.body;

  let command = "ADD";
  if (req.method === "DELETE") {
    command = "DELETE";
  }

  const registration = await Iron.unseal(
    CookieService.getRegisteredToken(req.cookies),
    process.env.ENCRYPTION_SECRET,
    Iron.defaults
  );
  var params = {
    TableName: "schedule",
    Key: {
      slug: {
        S: slug,
      },
    },
    UpdateExpression: `${command} attendees :email`,
    ExpressionAttributeValues: {
      ":email": {
        SS: [registration.email],
      },
    },
  };
  console.log(params);

  return new Promise((resolve, _) => {
    ddb.updateItem(params, function (err, data) {
      if (err) {
        res.status(405).json({ success: false });
        console.log("Error", err);
      } else {
        res.json({ success: true, message: "registration_success" });
      }
      resolve();
    });
  });
}
