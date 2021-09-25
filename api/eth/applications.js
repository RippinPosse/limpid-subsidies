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
      data: contract.methods.start(input).encodeABI(),
      from: user_addr,
      gasLimit: 0x47b760,
      gasPrice: "0xbebc200",
    };

    const commmon = new Common({ chain: "ropsten", hardfork: "petersburg" });
    const tx = Transaction.fromTxData(rawTX, { commmon });
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    const res = await web3.eth.sendSignedTransaction(
      "0x" + serializedTx.toString("hex")
    );

    return res.contractAddress;
  } catch (error) {
    throw new Error("start application: " + error);
  }
};

module.exports = {
  create,
  start,
};
