const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
// ------------------------------------auth0
const { auth, requiresAuth } = require("express-openid-connect");
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
const { profileInfoHandle } = require("./handlers/auth0");
// ------------------------------------google oauth20
const app = express();
const port = process.env.PORT || 8000;
// ------------------------------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// ------------------------------------
app
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // ------------------------------------------------auth0
  .use(auth(config))
  .get("/profile", requiresAuth(), profileInfoHandle)

  // ------------------------------------
  .listen(port, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
    );
  });
// ------------------------------------
