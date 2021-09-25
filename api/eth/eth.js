const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_URL));

const createAccount = () => {
  try {
    const account = web3.eth.accounts.create();
    return { address: account.address, privateKey: account.privateKey };
  } catch (error) {
    throw new Error("create account failed: " + error);
  }
};

module.exports.createAccount = createAccount;
