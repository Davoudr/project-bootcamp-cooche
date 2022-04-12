//-----------------connection string setup MongoDB--------------------
require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// ------------
const client = new MongoClient(MONGO_URI, options);
const db = client.db(dbName);
// ------------
const loginHandle = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const allItems = await db.collection("users").insertOne({"title": "test"});
    console.log("loginHandle", "allItems", allItems);
    res.status(200).json({status: 200, data: "msg"});
    // sendResponse(res, 200, `msg`);
  } catch (error) {
    console.log(`Error in loginHandle: ${error}`);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = {
  loginHandle,
};
