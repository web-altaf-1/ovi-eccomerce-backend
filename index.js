const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");


const port = process.env.PORT || 5000;


mongoose.connect(process.env.DATABASE).then(async () => {
  console.log(`Database is connected successfully`.blue.bold);
  app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
  });
});