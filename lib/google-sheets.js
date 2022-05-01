import { google } from "googleapis";

const credentials = {
  client_id:
    "606447542569-nje4dl2j96imck8f3loqrqqhnippndfo.apps.googleusercontent.com",
  project_id: "west-coast-climate-crisis",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: process.env.GOOGLE_SHEETS_API_SECRET,
  redirect_uris: ["http://localhost"],
};

const token = {
  access_token: process.env.GOOGLE_SHEETS_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_SHEETS_REFRESH_TOKEN,
  scope: "https://www.googleapis.com/auth/spreadsheets",
  token_type: "Bearer",
  expiry_date: 1651253303835,
};

var googleSheets = {
  credentials,
  token,
  ddb: null,
  init: function (ddb) {
    this.ddb = ddb;
    const boundRegister = this.writeRegistrar.bind(this);
    this.authorize(this.credentials, boundRegister);
  },
  authorize: function (credentials, callback, ddb) {
    const { client_secret, client_id, redirect_uris } = credentials;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    // I don't think I need this
    // if (!token) return this.getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(this.token);
    callback(oAuth2Client);
  },
  writeRegistrar: function (auth) {
    const climate_id = "1slbl_n0yvylsONoTc782Aqgule6mY_RNcmxDjXYzmZQ";
    const sheets = google.sheets({ version: "v4", auth });
    var params = {
      TableName: "climate",
    };
    this.ddb.scan(params, async function (err, data) {
      if (err) res.status(404).send();
      await sheets.spreadsheets.values.clear({
        spreadsheetId: climate_id,
        range: "Sheet1!A1:E",
      });
      const header = [
        "First Name",
        "Last Name",
        "Affiliation",
        "Email",
        "Phone",
      ];
      const d = data.Items.map((row) => {
        return [
          row.firstName.S,
          row.lastName.S,
          row.affiliation.S,
          row.email.S,
          row.phone.S,
        ];
      });
      sheets.spreadsheets.values.append({
        spreadsheetId: climate_id,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        resource: { values: [header, ...d] },
      });
    });
  },
};

export default googleSheets;
