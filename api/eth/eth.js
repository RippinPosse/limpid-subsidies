const Web3 = require("web3");

const options = {
  transactionConfirmationBlocks: 1,
};

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.ETH_URL),
  null,
  options
);

web3.eth
  .getBalance("0x9C82ECfcce575A2AED70b203Da009e4d50F77DBc")
  .then(console.log);

const createAccount = () => {
  try {
    const account = web3.eth.accounts.create();
    return { address: account.address, privateKey: account.privateKey };
  } catch (error) {
    throw new Error("create account failed: " + error);
  }
};

module.exports = {
  web3,
};
module.exports.createAccount = createAccount;
