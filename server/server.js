const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require(`body-parser`);
const mongoose = require("mongoose");
require("dotenv").config();
// ------------------------------------cloudnary
const { cloudinary } = require("./utils/cloudinary");
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
const app = express();
const port = process.env.PORT || 8000;
// ----------------------------------------------------------importing handlers
const { handleUserAdd } = require("./handlers/handleUserAdd");
const { handleUserGet } = require("./handlers/handleUserGet");
const { handleBusinessAdd } = require("./handlers/handleBusinessAdd");
const {
  handleBusinessGetByCategory,
} = require("./handlers/handleBusinessGetByCategory");

// ----------------------------------------------------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// ------------------------------------
app
  .use(express.static("public"))
  .use("/", express.static(__dirname + "/"))
  // ---------------------------------------------------------upload file
  .use(bodyParser.json({ limit: "50mb" }))
  .use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
  .use(fileUpload())
  .use(cors())
  // -----------------------------------------------------------auth0
  .use(auth(config))
  // -----------------------------------------------------------endpoints
  .post("/user/add", (req, res) => {
    handleUserAdd(req, res, process.env.DB_NAME);
  })
  .post("/user/sign-in", (req, res) => {
    handleUserGet(req, res, process.env.DB_NAME);
  })
  .post("/business/add", (req, res) => {
    handleBusinessAdd(req, res, process.env.DB_NAME);
  })
  .get("/business/by-category/:category", (req, res) => {
    handleBusinessGetByCategory(req, res, process.env.DB_NAME);
  })

  // ------------------------------------
  .listen(port, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
    );
  });
// ------------------------------------
