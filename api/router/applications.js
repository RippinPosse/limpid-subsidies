const express = require("express");
const Joi = require("joi");

const ethApplications = require("../eth/applications");
const auth = require("../middleware/auth");
const Users = require("../db/users");
const Applications = require("../db/applications");
const Documents = require("../db/documents");
const { web3 } = require("../eth/eth");

const router = express.Router();

const applicationInputSchema = Joi.object({
  input: Joi.object({
    public: Joi.bool(),
    documents: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
      })
    ),
  }).required(),
  token: Joi.string(),
});

router.route("/new").post(auth, async (req, res) => {
  try {
    const result = applicationInputSchema.validate(req.body);
    if (result.error) {
      return res
        .status(422)
        .send({ message: "invalid application input: " + result.error });
    }

    const user = await Users.findById(req.user.user_id);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (!user.address) {
      return res.status(404).json({ message: "account not found" });
    }

    const savedDocs = await Documents.save(user.id, req.body.input.documents);
    const id = await Applications.getLastID();

    let docs = [];
    savedDocs.forEach((doc) => {
      docs.push({
        id: doc.id,
        name: doc.name,
        status: 0,
      });
    });

    const address = await ethApplications.create(
      user.address,
      user.private_key
    );

    const application = {
      user_id: user.id,
      address: address,
      public: req.body.input.public,
    };
    const savedApplication = await Applications.save(application);

    const input = {
      subsidy: "Subsidy №" + id,
      number: id,
      documents: docs,
    };

    const tx = await ethApplications.start(
      savedApplication.address,
      user.address,
      user.private_key,
      input
    );

    console.log(tx);

    return res.status(200).json({
      id: savedApplication.id,
      address: savedApplication.address,
      tx: tx,
    });
  } catch (error) {
    throw new Error("new application: " + error);
  }
});

router.route("/:id").get(auth, async (req, res) => {
  try {
    const application = await Applications.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "not found" });
    }

    if (!application.public) {
      return res.status(403).json({ message: "application is not public" });
    }

    const updates = await ethApplications.getAllUpdates(application.address);

    return res.status(200).json({ id: application.id, updates: updates });
  } catch (error) {
    throw new Error("get account: " + error);
  }
});

module.exports = router;
