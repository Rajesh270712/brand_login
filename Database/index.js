const mongoose = require("mongoose");
require('dotenv').config()

async function databaseConnect() {
  try {
    const MongoUri = process.env.MONGOURI
    await mongoose.connect(MongoUri);
    console.log("successfully connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = databaseConnect;
