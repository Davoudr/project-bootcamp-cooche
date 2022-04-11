// index.js

const { auth } = require("express-openid-connect");
const express = require("express");
const app = express();
// const port = app.env.PORT || 8000;
const port = 000;
require("dotenv").config();

app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
