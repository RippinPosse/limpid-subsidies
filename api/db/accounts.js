const db = require("./db");

const save = async (user) => {
  try {
    const query = {
      text: "UPDATE users SET address=$1, private_key=$2 WHERE id = $3 RETURNING *",
      values: [user.address, user.privateKey, user.id],
    };
    const res = await db.query(query);
    return res.rows[0];
  } catch (error) {
    throw new Error("save account info: " + error);
  }
};

module.exports = {
  save,
};
