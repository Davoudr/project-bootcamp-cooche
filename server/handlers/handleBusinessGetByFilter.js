// ----------------------------------------mongodb connection setup
require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
// ----------------------------------------main func
const handleBusinessGetByFilter = async (req, res, dbName) => {
  let request = req.body;
  console.log(request)



  let filter = {category: request.category.toLowerCase()}
  // --------------------------------------connection
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    // ------------------------------------looking for user using given info
    let result = await db
      .collection("businesses")
      .find(filter)
      .toArray();
    // ------------------------------------sending proper res based on db-result
    if (result.length === 0) {
      res.status(400).json({
        status: 400,
        message: "There is no user bussiness with this filter!",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Bussiness has been found successfully!",
        user: result,
      });
    }
    // ------------
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(`Error (BE / handleBusinessGetByFilter): ${error}`);
  }
};

module.exports = {
  handleBusinessGetByFilter,
};
