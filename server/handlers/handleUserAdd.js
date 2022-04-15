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
  let data= req.body;
  console.log(data.pic)
  if (data.pic === "undefined" || data.pic === "null") {
    data = {...data , pic : process.env.DEFAULT_USER_ICON}
  }
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    const result = await db.collection("users").insertOne({...req.body, picFile: req.files});

    res.status(201).json({
      status: 201,
      data: result,
      message: `User is added successfully to /db->${dbName}/cllection->users/by->handleUserAdd/using</user/add>!`,
    });
  } catch (error) {
    console.log(`Error (BE / handleUserAdd): ${error}`);
  }
};

module.exports = {
  handleUserAdd,
};
 