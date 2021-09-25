const db = require("./db");
const format = require("pg-format");

const save = async (user_id, documents) => {
  try {
    const query = {
      text: "INSERT INTO documents (user_id, name)  VALUES %L RETURNING *",
      values: [],
    };

    documents.forEach((doc) => {
      query.values.push([user_id, doc.name]);
    });

    const res = await db.query(format(query.text, query.values));

    return res.rows;
  } catch (error) {
    throw new Error("save documents: " + error);
  }
};

module.exports = {
  save,
};
