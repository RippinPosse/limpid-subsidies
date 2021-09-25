const express = require("express");
const webpush = require("web-push");
const superagent = require("superagent");

const applicationContractABI = require("./contracts/application_abi.json");
const applicationContractBC = require("./contracts/application_bc.json");

const API_ENDPOINT = "http://api:" + process.env.API_PORT;

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_URL));

const app = express();

app.post("/subscribe", async (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const address = subscription.address;
  const userAddress = subscription.user_address;

  const resp = await superagent.get(API_ENDPOINT + "/users/" + userAddress);
  if (resp.status == 404) {
    return res.status(404).json(resp.body);
  }

  const contract = new web3.eth.Contract(applicationContractABI, address);

  contract.events.Update({}).on("data", async () => {
    webpush
      .sendNotification(subscription, {})
      .catch((err) => console.error(err));
  });
});

const port = process.env.HOOKS_PORT || 8000;
app.listen(port, console.log("hooks listening on port: " + port));
