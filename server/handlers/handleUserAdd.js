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
const handleUserAdd = async (req, res, dbName) => {
  let data = req.body;
  if (data.pic === "undefined" || data.pic === "null") {
    data = { ...data, pic: process.env.DEFAULT_USER_ICON };
  }
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    let result = null;
    const foundWithThisId = await db
      .collection("users")
      .find({ email: req.body.email })
      .toArray();
    if (foundWithThisId.length === 0) {
      if (req.files === null) {
        result = await db
          .collection("users")
          .insertOne({ ...req.body, picBinary: false });
      } else {
        result = await db
          .collection("users")
          .insertOne({
            ...req.body,
            pic: undefined,
            picfiles: req.files.pic,
            picBinary: true,
          });
      }
      res.status(201).json({
        status: 201,
        data: result,
        message: `User is added successfully to /db->${dbName}/cllection->users/by->handleUserAdd/using</user/add>!`,
      });
    } else {
      const response = () => {
        res.status(400).json({
          status: 400,
          message: `There is already a profile with this E-mail address (${req.body.email}) for you; so, you can easily sign-in!`,
        });
      };
      setTimeout(response, 1500); // to simulate some delay in orther to show up loading in FE
    }
  } catch (error) {
    console.log(`Error (BE / handleUserAdd): ${error}`);
  }
};

module.exports = {
  handleUserAdd,
};
