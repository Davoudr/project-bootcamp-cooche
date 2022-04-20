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
const handleBusinessAdd = async (req, res, dbName) => {
  let businessObj = req.body;
  // --------------------------------------connection
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);
  try {
    // ------------------------------------checking if businessObj already exists in db then sending proper res
    //
    // ------------------------------------adding bussiness to db
    result = await db.collection("businesses").insertOne(businessObj);
    console.log(result)
    // -------------------------------------sending proper res to FE base on the result from server
    if (result.acknowledged === true) {
      res.status(201).json({
        status: 201,
        data: result,
        message: `Business is added successfully to /db->${dbName}/cllection->businesses/by->handleBusinessAdd/using</business/add>!`,
      });
    } else {
        res.status(502).json({
            status: 502,
            data: result,
            message: `Please try one more time!`,
          });
    }
    // -----------------handling server's err
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(`Error (BE / handleBusinessAdd): ${error}`);
  }
};
// -------------------------------------------
module.exports = { 
  handleBusinessAdd,
};
             