const { web3 } = require("./eth");
const Common = require("@ethereumjs/common").default;
const { Transaction } = require("@ethereumjs/tx");

const applicationContractABI = require("../contracts/application_abi.json");
const applicationContractBC = require("../contracts/application_bc.json");

const create = async (user_addr, user_pk) => {
  try {
    const rawTX = {
      data: "0x" + applicationContractBC.object,
      from: user_addr,
      gasLimit: 4700000,
      gasPrice: "2300000000",
    };

    const signedTX = await web3.eth.accounts.signTransaction(rawTX, user_pk);

    const res = await web3.eth
      .sendSignedTransaction(signedTX.rawTransaction)
      .on("error", (error) => {
        throw new Error("send transaction: " + error);
      })
      .on("receipt", function (receipt) {
        return receipt.contractAddress;
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log("confirmation", confirmationNumber);
      });

    return res.contractAddress;
  } catch (error) {
    throw new Error("create application: " + error);
  }
};

const start = async (address, user_addr, user_pk, input) => {
  try {
    const contract = new web3.eth.Contract(applicationContractABI, address);

    const privateKey = Buffer.from(user_pk.slice(2), "hex");

    const rawTX = {
      nonce: web3.utils.toHex(await web3.eth.getTransactionCount(user_addr)),
      data: contract.methods.start(input).encodeABI(),
      from: user_addr,
      to: address,
      gasLimit: 0x47b760,
      gasPrice: "0xbebc200",
      chain: "ropsen",
      hardfork: "london",
    };

    const commmon = new Common({ chain: "ropsten" });
    const tx = Transaction.fromTxData(rawTX, { commmon });

    const signed = await web3.eth.accounts.signTransaction(rawTX, user_pk);

    // var serializedTx = signed.serialize();

    const res = await web3.eth
      .sendSignedTransaction(
        // "0x" + serializedTx.toString("hex")
        signed.rawTransaction
      )
      .once("receipt", (receipt) => {
        return receipt.transactionHash;
      })
      .on("error", (err) => {
        console.log(err);
      });

    return res.transactionHash;
  } catch (error) {
    throw new Error("start application: " + error);
  }
};

const getAllUpdates = async (address) => {
  try {
    const contract = new web3.eth.Contract(applicationContractABI, address);
    const events = await contract.getPastEvents("Update");

    let updates = [];

    events.forEach((event) => {
      updates.push(event.returnValues);
    });

    return updates;
  } catch (error) {
    throw new Error("get all updates: " + error);
  }
};

module.exports = {
  create,
  start,
  getAllUpdates,
};
