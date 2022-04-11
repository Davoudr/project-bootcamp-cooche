// index.js

const { auth } = require("express-openid-connect");
app.use(
  auth({
    issuerBaseURL: "https://YOUR_DOMAIN",
    baseURL: "https://YOUR_APPLICATION_ROOT_URL",
    clientID: "YOUR_CLIENT_ID",
    secret: "LONG_RANDOM_STRING",
    idpLogout: true,
  })
);
const express = require("express");
const app = express();
require("dotenv").config();

const port = app.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
