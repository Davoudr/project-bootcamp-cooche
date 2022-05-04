// ----------------------------------------mongodb connection setup
require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const dbName = "app_db";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const { cloudinary } = require("../utils/cloudinary");
// ----------------------------------------main func
const handleUserAdd = async (req, res, dbName) => {
  let picUrlCloudinary = "";
  let userObj = {};
  // --------------------------------------connection
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    // ------------------------------------if profile pic has been uploaded, picUrlCloudinary = <pic's url in Cloudinary>
    if (req.body.base64) {
      const fileStr = req.body.pic;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "cooche",
      });
      if (
        typeof uploadedResponse.created_at === "string" &&
        uploadedResponse.created_at.length > 0
      ) {
        picUrlCloudinary = uploadedResponse.url;
      }
    }
    // ------------------------------------making sure there is a profile image in user-obj (although, FE takes care of it)
    const dbUserObj = { // removing base64 from the obj that is delivered by FE
      username: req.body.username,
      email: req.body.email,
      given_name: req.body.given_name,
      family_name: req.body.family_name,
      password: req.body.password,
    }
    switch (true) { // adding pic-URL to dbUserObj 
      case req.body.base64:
        userObj = { ...dbUserObj, pic: picUrlCloudinary };
        break;
      case typeof req.body.pic === "string" && req.body.pic.length === 0:
        userObj = { ...dbUserObj, pic: process.env.DEFAULT_USER_ICON };
        break;
      default:
        userObj = { ...dbUserObj, pic: req.body.pic };
    }
    // ------------------------------------checking if user-obj already exists in db then sending proper res
    let result = null;
    const foundWithThisId = await db
      .collection("users")
      .find({ email: req.body.email })
      .toArray();
    // -----------------------------------for thoes users who have uploaded pic, server has got cloudinary-file-url and should send it to FE
    // -----------------------------------for new-user, sending secure user-obj (without his/her password)
    if (foundWithThisId.length === 0) {
      result = await db.collection("users").insertOne(userObj);
      console.log(result)
      res.status(201).json({
        status: 201,
        user: { ...userObj, password: null , id: result.insertedId },
        message: `User is added successfully to /db->${dbName}/cllection->users/by->handleUserAdd/using</user/add>!`,
      });
    } else {
      // ---------------------------------for old user, letting FE know that he/she has already a profile
      res.status(400).json({
        status: 400,
        message: `There is already a profile with this E-mail address (${req.body.email}) for you; so, you can easily sign-in!`,
      });
    }
    // -----------------handling server's err
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(`Error (BE / handleUserAdd): ${error}`);
  }
};
// -------------------------------------------
module.exports = {
  handleUserAdd,
};
