const express = require("express");
const Joi = require("joi");

const Users = require("../db/users");
const userModel = require("../models/user");

const router = express.Router();

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});

router.route("/register").post(async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
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

    const hash = userModel.hashPassword(password);

    const newUser = {
      email: email,
      password: hash,
      firstname: firstname,
      lastname: lastname,
    };

    const savedUser = await Users.save(newUser);

    return res.status(201).json({ savedUser });
  } catch (error) {
    throw new Error("register user: " + error);
  }
});

module.exports = router;
