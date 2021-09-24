const { Client } = require("pg");

const DB = new Client({
  connectionString: process.env.DATABASE_URL,
});

DB.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  }
});

module.exports = DB;
