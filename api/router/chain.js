const express = require("express");
const Joi = require("joi");

const eth = require("../eth/eth");
const auth = require("../middleware/auth");
const Users = require("../db/users");
const Accounts = require("../db/accounts");

const router = express.Router();

router.route("/account").get(auth, async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.user_id);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (!user.address) {
      return res.status(404).json({ message: "account not found" });
    }

    if (!user.private_key) {
      return res.status(200).json({ address: user.address });
    }

    return res
      .status(200)
      .json({ address: user.address, private_key: user.private_key });
  } catch (error) {
    throw new Error("get account: " + error);
  }
});

const accountSettingsSchema = Joi.object({
  save_pk: Joi.bool().required(),
  token: Joi.string(),
});

router.route("/account/new").post(auth, async (req, res, next) => {
  try {
    const result = accountSettingsSchema.validate(req.body);
    if (result.error) {
      return res
        .status(422)
        .send({ message: "invalid user data: " + result.error });
    }

    const user = await Users.findById(req.user.user_id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.address) {
      return res
        .status(403)
        .json({ message: "account already created. delete previuos first" });
    }

    const account = eth.createAccount();

    const userData = {
      id: user.id,
      address: account.address,
      privateKey: req.body.save_pk ? account.privateKey : null,
    };

    const updatedUser = await Accounts.save(userData);

    return res.status(200).json({
      address: updatedUser.address,
      private_key: updatedUser.private_key,
    });
  } catch (error) {
    throw new Error("new account: " + error);
  }
});

module.exports = router;
