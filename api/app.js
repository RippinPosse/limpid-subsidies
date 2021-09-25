const express = require("express");
const cors = require("cors");

const users = require("./router/users");
const chain = require("./router/chain");
const applications = require("./router/applications");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/chain", chain);
app.use("/applications", applications);

const port = process.env.API_PORT || 5000;
app.listen(port, console.log("listening on port: " + port));
