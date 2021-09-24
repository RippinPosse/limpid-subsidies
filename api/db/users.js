const db = require("./db");

const findByEmail = async (email) => {
  try {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    const res = await db.query(query);

    return res.rows[0];
  } catch (error) {
    throw new Error("find user: " + error);
  }
};

const save = async (user) => {
  try {
    const query = {
      text: "INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4)",
      values: [user.email, user.password, user.firstname, user.lastname],
    };

    const res = await db.query(query);

    return res.rows[0];
  } catch (error) {
    throw new Error("save user: " + error);
  }
};

module.exports = {
  findByEmail,
  save,
};
