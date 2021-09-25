const bcrypt = require("bcryptjs");

module.exports.hashPassword = async (password, salt = "") => {
  let pass = {};

  try {
    if (salt === "") {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      pass.salt = salt;
      pass.hash = hash;

      return pass;
    }

    pass.hash = await bcrypt.hash(password, salt);

    return pass;
  } catch (error) {
    throw new Error("hash failed: " + error);
  }
};
