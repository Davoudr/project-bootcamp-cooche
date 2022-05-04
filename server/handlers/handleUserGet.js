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
// ----------------------------------------main func
const handleUserGet = async (req, res, dbName) => {
  let data = req.body;
  // --------------------------------------connection
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    // ------------------------------------looking for user using given info
    let foundWithEamil = await db
      .collection("users")
      .findOne({ email: req.body.email });
    // ------------------------------------sending proper res based on db-result
    switch (true) {
      case foundWithEamil === null:
        const noUser = () => {
          res.status(400).json({
            status: 400,
            message: "There is no user associated with this E-mail address!",
          });
        };
        setTimeout(noUser, 1000); // to simulate some delay in orther to show up loading in FE
        break;
      case foundWithEamil.password !== data.password:
        const wrongPass = () => {
          res.status(401).json({
            status: 401,
            message: "Wrong password has been inserted!",
          });
        };
        setTimeout(wrongPass, 1000); // to simulate some delay in orther to show up loading in FE
        break;
      default:
        const success = () => {
          const userObjFE = {
            id: foundWithEamil._id,
            username: foundWithEamil.username,
            email: foundWithEamil.email,
            given_name: foundWithEamil.given_name,
            family_name: foundWithEamil.family_name,
            pic: foundWithEamil.pic,
            userHasThePassword: true,
          };
          res.status(200).json({
            status: 200,
            message: "User has been found successfully!",
            user: userObjFE,
          });
        };
        setTimeout(success, 1000); // to simulate some delay in orther to show up loading in FE
    }
    // ------------
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(`Error (BE / handleUserGet): ${error}`);
  }
};

module.exports = {
  handleUserGet,
};
