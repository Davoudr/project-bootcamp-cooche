const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
// ------------------------------------
const app = express();
const port = process.env.PORT || 5000;
// ------------------------------------
const { loginHandle } = require("./handlers/loginHandle");
const { connectdb } = require("./connectdb");
// ------------------------------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app

  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // ------------------------------------
  .get("/user-login", loginHandle)
  // ------------------------------------
  .listen(port, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
    );
  });
// ------------------------------------
