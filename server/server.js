const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require(`body-parser`);
const mongoose = require("mongoose");
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
  
// ------------------------------------
const {handleUserAdd} = require ("./handlers/handleUserAdd")

// ------------------------------------
const app = express();
const port = process.env.PORT || 8000;
// ------------------------------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// ------------------------------------------------upload file
// const connection = async () => {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
//   try {
//     await mongoose.connect(process.env.MONGO_URI, connectionParams);
//     console.log("Successfully connected to database!");
//   } catch (err) {
//     console.log("Error: Could not connect to database!");
//   }
// };
// database connection
// connection();//////////////////////////
// ------------------------------------
app
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // ------------------------------------------------upload file
   
  .use(bodyParser.urlencoded({ extended: false }))
  .use(fileUpload())
  .use(bodyParser.json())
  .use(cors())

  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  // ------------------------------------------------auth0
  .use(auth(config))
  // ------------------------------------
  .post("/user/add", (req, res)=>{handleUserAdd(req,res,process.env.DB_NAME)})

  // ------------------------------------
  .listen(port, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
    );
  });    
// ------------------------------------  
       