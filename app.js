const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const jobs = require("./routes/jobs");
const DBConnection = require("./config/dbConnection");

const app = express();

app.use(express.json());
const PORT = process.env.PORT;
DBConnection();

app.use("/", jobs);

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (req, res) => {
  console.log(
    `Server running at ${process.env.PORT} in the ${process.env.NODE_ENV} mode`
  );
});
