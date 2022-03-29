import AWS from "aws-sdk";
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});
var docClient = new AWS.DynamoDB.DocumentClient();
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
ddb.docClient = docClient;
export default ddb;
