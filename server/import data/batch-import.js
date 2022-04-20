const { MongoClient } = require("mongodb");
const { users } = require("./data");
const { bussinesses } = require("./data");
// -------------------------------------------
require("dotenv").config();
// -------------------------------------------
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//===========================================
const dbFunction = async (dbName, collectionName, arr) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db(dbName);
  console.log("connected!");
  const result = await db.collection(collectionName).insertMany(arr);
  client.close();
  console.log("disconnected");
};
//===========================================
dbFunction("cooche", "users", users);
dbFunction("cooche", "bussinesses", bussinesses);
