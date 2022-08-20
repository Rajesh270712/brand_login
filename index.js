const express = require("express");
const cors = require("cors");
const databaseConnect = require("./Database");
const signUpRoute = require("./Routers/signup");
const loginRoute = require("./Routers/login");
require('dotenv').config()
const app = express();
const port =   process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({
    message: "connected",
  });
});

app.use(signUpRoute);
app.use(loginRoute);

databaseConnect().then(() => {
  app.listen( port , () => {
    console.log("port running at 8080");
  });
});
