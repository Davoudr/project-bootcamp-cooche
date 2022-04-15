const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async (dbName) => {

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to MongoClient (db: ${dbName})`);


  exports.addUser = (data)=>{
    await db.collection("users").insertOne(data,(err, result)=>{
        if (err) {
            console.log(`Error! addUser --> dbName: ${dbName} --> collection: users`);
        } else {console.log(`Successfully added!`)}
    })
  }
};

dbFunction("Cooche");

