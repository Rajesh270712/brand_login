const express = require("express");
const userModel = require("../Database/user");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

async function login(req, res) {
  try {
    const { user } = req.body;

    const existingUser = await userModel.findOne({
      email: user.email,
    });
    const SECRET = process.env.SECRET;
    if (existingUser) {
      if (bcrypt.compareSync(user.password, existingUser.password)) {
        const encrypted_token = jwt.sign(
          {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            password: existingUser.password,
          },
          SECRET
        );
        res.send({
          token: encrypted_token,
        });
      } else {
        res.status(400).send({
          error: "password",
          message: "Incorrect password",
        });
      }
    } else {
      res.status(400).send({
        error: "email",
        message: "Email does not exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

route.post("/login", login);

module.exports = route;
