const mongoose = require("mongoose");

async function databaseConnect() {
  try {
    await mongoose.connect("mongodb+srv://brand:JV0cV5VJdeReSK2J@cluster0.zgprpdu.mongodb.net/user");
    console.log("successfully connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = databaseConnect;
