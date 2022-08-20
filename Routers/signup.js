const express = require("express");
const userModel = require("../Database/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const route = express.Router();

function validateEmail(InputEmail) {
  if (InputEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return true;
  } else {
    return false;
  }
}

function encryptPassword(myPlaintextPassword) {
  const saltRounds = 10;
  return bcrypt.hashSync(myPlaintextPassword, saltRounds);
}

async function createUser(req, res) {
  try {
    const { user } = req.body;

    // validates Email (regex)
    if (!validateEmail(user.email)) {
      res.status(400).send({
        error: "email",
        message: "Invalid Email",
      });
    }

    // Check password strength
    if (!validator.isStrongPassword(user.password)) {
      res.status(400).send({
        error: "password",
        message:
          "Password Should contain atleast 1 Uppercase, 1 Lowercase, 1 Symbol, 1 Number and Minimum length should be 8",
      });
    }

    // Check if user exist or not
    let existingUser = await userModel.findOne({
      email: user.email,
    });

    if (existingUser) {
      res.status(409).send({
        error: "email",
        message: "Email Already Exist",
      });
    }
    // Encrypt password
    user.password = encryptPassword(user.password);

    let data = await userModel.create(user);

    res.send({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    res.send({
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
}

route.post("/signUp", createUser);
route.get("/getAllUser", getAllUser);

module.exports = route;
