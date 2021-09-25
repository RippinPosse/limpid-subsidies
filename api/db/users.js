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
    throw new Error("find user by email: " + error);
  }
};

const findByAddress = async (address) => {
  try {
    const query = {
      text: "SELECT * FROM users WHERE address = $1",
      values: [address],
    };

    const res = await db.query(query);

    return res.rows[0];
  } catch (error) {
    throw new Error("find user by address: " + error);
  }
};

const findById = async (id) => {
  try {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    const res = await db.query(query);

    return res.rows[0];
  } catch (error) {
    throw new Error("find user by id: " + error);
  }
};

const save = async (user) => {
  try {
    const query = {
      text: "INSERT INTO users (email, password, salt, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [
        user.email,
        user.password,
        user.salt,
        user.firstname,
        user.lastname,
      ],
    };

    const res = await db.query(query);

    return res.rows[0];
  } catch (error) {
    throw new Error("save user: " + error);
  }
};

module.exports = {
  findByEmail,
  findByAddress,
  findById,
  save,
};
