const bcrypt = require("bcryptjs");

module.exports.hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    throw new Error("hash failed: " + error);
  }
};
