const db = require("./db");

const save = async (application) => {
  try {
    const query = {
      text: "INSERT INTO applications (user_id, address, public) VALUES ($1, $2, $3) RETURNING *",
      values: [application.user_id, application.address, application.public],
    };

    const res = await db.query(query);

    return res.rows[0];
  } catch (error) {
    throw new Error("save application: " + error);
  }
};

const getLastID = async () => {
  try {
    const query = "SELECT COALESCE(MAX(id), 0) as id FROM applications";

    const res = await db.query(query);

    return res.rows[0].id;
  } catch (error) {
    throw new Error("get last id: " + error);
  }
};

module.exports = {
  save,
  getLastID,
};
