const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const jobs = require("./routes/jobs");
const DBConnection = require("./config/dbConnection");
const errorHandlers = require("./middleware/errors");

const app = express();

app.use(express.json());
const PORT = process.env.PORT;
DBConnection();


//Routes
app.use("/", jobs);

//Middelware for errors
app.use(errorHandlers);

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (req, res) => {
  console.log(
    `Server running at ${process.env.PORT} in the ${process.env.NODE_ENV} mode`
  );
});
