//-----------------connection string setup MongoDB--------------------
require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const dbName = "app_db";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
// ------------
const handleUserGet = async (req, res, dbName) => {
  let data = req.body;
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    let foundWithThisId = await db
      .collection("users")
      .findOne({ email: req.body.email });
    // ------------
    switch (true) {
      case foundWithThisId === null:
        const noUser = () => {
          res.status(400).json({
            status: 400,
            message: "There is no user associated with this E-mail address!",
          });
        };
        setTimeout(noUser, 1000); // to simulate some delay in orther to show up loading in FE
        break;
      case foundWithThisId.password !== data.password:
        const wrongPass = () => {
          res.status(401).json({
            status: 401,
            message: "Wrong password has been inserted!",
          });
        };
        setTimeout(wrongPass, 1000);
        break;
      default:
        const success = () => {
          res.status(200).json({
            status: 200,
            message: "User has been found successfully!",
            data: { ...foundWithThisId, password: null },
          });
        };
        setTimeout(success, 1000);
    }
    // ------------
  } catch (error) {
    console.log(`Error (BE / handleUserGet): ${error}`);
  }
};

module.exports = {
  handleUserGet,
};
