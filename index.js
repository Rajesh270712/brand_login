const express = require("express");
const cors = require("cors");
const databaseConnect = require("./Database");
const signUpRoute = require("./Routers/signup");
const loginRoute = require("./Routers/login");

const app = express();
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
  app.listen(8080, () => {
    console.log("port running at 8080");
  });
});
