import ddb from "./ddb";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";

export default async function handler(req, res) {
  let registration;
  // try {
  //   registration = await Iron.unseal(
  //     CookieService.getRegisteredToken(req.cookies),
  //     process.env.ENCRYPTION_SECRET,
  //     Iron.defaults
  //   );
  // } catch (err) {
  //   console.log("no register cookie");
  //   res.end();
  // }

  const emailParams = {
    TableName: "climate",
    ExpressionAttributeValues: {
      ":attending": "inPerson",
    },
    FilterExpression: "attending = :attending",
    ProjectionExpression: "email",
  };
  const emailsInPersonItems = (await ddb.docClient.scan(emailParams).promise())
    .Items;
  const emailsInPerson = emailsInPersonItems.map(({ email }) => {
    // console.log(email);
    return email.toLowerCase();
  });
  // if (registration.email !== "undefined") {
  var params = {
    TableName: "schedule",
  };
  const schedule = (await ddb.docClient.scan(params).promise()).Items;
  const scheduleInPerson = schedule.map((item) => {
    console.log(item);
    const emails = item.attendees.values.filter((email) =>
      emailsInPerson.includes(email.toLowerCase())
    );
    return `${item.slug}: ${emails.length}`;
    return { slug: item.slug, count: emails.length };
  });

  res.json(scheduleInPerson.join("\n"));
  return new Promise((resolve, _) => {
    ddb.scan(params, async function (err, data) {
      if (err) res.status(404).send();
      console.log(data);

      res.json(data.Items);
      resolve();
    });
  });
  // } else {
  //   res.status(405).end();
  // }
}

// TO GET COUNTS FOR EACH SCHEDULE EVENT
// create a map of emails that are labeled as attending in person
// emailsInPerson =  ddb.scan({Table:climate, where attending === inPerson})
// {slug, attendees} = ddb.scan({Table:schedule})
// for each attendees from slug
// count = attendees.filter(attendee => emailsInPerson.includes(attendee))
