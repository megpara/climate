import ddb from "./ddb";
export default async function handler(req, res) {
  console.log(req.body, "BODY");
  const { email, attending } = req.body;
  console.log(email, attending);
  const params = {
    TableName: "climate",
    Key: {
      email,
    },
    UpdateExpression: "set attending = :attending",
    ExpressionAttributeValues: {
      ":attending": attending,
    },
  };

  const response = await ddb.docClient.update(params).promise();
  res.send(response);
}
