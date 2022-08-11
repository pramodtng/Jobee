const mongoose = require("mongoose");

const DBConection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`Database connected to ${conn.connection.host}`);
    });
};

module.exports = DBConection;
