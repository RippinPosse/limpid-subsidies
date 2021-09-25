const { web3 } = require("./eth");

const applicationContractABI = require("../contracts/application_abi.json");
const applicationContractBC = require("../contracts/application_bc.json");

const create = async (user_addr, input) => {
  try {
    const contract = new web3.eth.Contract(applicationContractABI);

    const deployed = await contract
      .deploy({ data: "0x" + applicationContractBC.object, arguments: [input] })
      .send({ from: user_addr, gas: "4700000", gasPrice: "20000000000000" });

    return deployed.address;
  } catch (error) {
    throw new Error("create application: " + error);
  }
};

module.exports = {
  create,
};
