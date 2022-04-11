// index.js

const express = require("express");
const app = express();
// const port = app.env.PORT || 8000;
const port = 8000;
require("dotenv").config();







app.listen(port, () => {
  console.log(`listening on port ${port}`);
})