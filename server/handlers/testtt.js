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
const testtt = async (req, res, dbName) => {
 
  // --------------------------------------connection
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {

    // -----------------handling server's err
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(`Error (BE / handleBusinessAdd): ${error}`);
  }
};
// -------------------------------------------
module.exports = {
  testtt,
};
