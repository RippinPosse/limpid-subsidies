const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const Users = require("../db/users");
const userModel = require("../models/user");

const router = express.Router();

const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});

router.route("/register").post(async (req, res) => {
  try {
    const result = registerSchema.validate(req.body);
    if (result.error) {
      return res
        .status(422)
        .send({ message: "invalid user data: " + result.error });
    }

    const { email, password, firstname, lastname } = req.body;

    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: "email already registered" });
    }

    const { hash, salt } = await userModel.hashPassword(password);

    const newUser = {
      email: email,
      password: hash,
      salt: salt,
      firstname: firstname,
      lastname: lastname,
    };

    const savedUser = await Users.save(newUser);

    const token = jwt.sign(
      { user_id: savedUser.id, email: newUser.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ token });
  } catch (error) {
    throw new Error("register user: " + error);
  }
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

router.route("/login").post(async (req, res) => {
  try {
    const result = loginSchema.validate(req.body);
    if (result.error) {
      return res
        .status(422)
        .send({ message: "invalid user data: " + result.error });
    }

    const { email, password } = req.body;

    const user = await Users.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const { hash } = await userModel.hashPassword(password, user.salt);
    if (user.password !== hash) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    throw new Error("login user: " + error);
  }
});

router.route("/:address").get(async (req, res) => {
  try {
    const address = req.params.address;
    const user = await userModel.findByAddress(address);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const res = {
      email: user.email,
      user: user.password,
    };

    return res;
  } catch (error) {
    throw new Error("get user");
  }
});

module.exports = router;
