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
const handleBusinessGetByCategory = async (req, res, dbName) => {
  let request = req.params.category;
  console.log(request)
  // --------------------------------------connection
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    // ------------------------------------looking for user using given info
    let foundByCategory = await db
      .collection("businesses")
      .find({category : request})
      .toArray();
      console.log(foundByCategory)
    // ------------------------------------sending proper res based on db-result
    if (foundByCategory.length === 0) {
      res.status(400).json({
        status: 400,
        message: "There is no user bussiness with this category!",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Bussiness has been found successfully!",
        user: foundByCategory,
      });
    }
    // ------------
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(`Error (BE / handleBusinessGetByCategory): ${error}`);
  }
};

module.exports = {
  handleBusinessGetByCategory,
};
