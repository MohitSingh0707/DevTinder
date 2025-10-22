const express = require("express");
const connectDB = require("./config/database");
const { default: mongoose } = require("mongoose");

const cookieparser = require("cookie-parser");



const app = express();
app.use(express.json());
app.use(cookieparser());

const authRouter  = require("./routes/auth");
const profileRouter  = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
