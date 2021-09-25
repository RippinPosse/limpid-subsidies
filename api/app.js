const express = require("express");
const cors = require("cors");

const users = require("./router/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

app.listen(
  process.env.API_PORT,
  console.log("listening on port: " + process.env.API_PORT)
);
