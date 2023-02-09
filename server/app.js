require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const CustomErrorMiddleware = require("./middlewares/CustomErrorMiddleware");
const NotFoundMiddleware = require("./middlewares/Not-Found");
const transactionRoute = require("./routes/transaction");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.status(200).json({ msg: "Welcome to Money Tracker Backend API" });
});

app.use("/api", transactionRoute);

app.use(NotFoundMiddleware);
app.use(CustomErrorMiddleware);

const PORT = process.env.PORT || 5000;
const start = () => {
   try {
      mongoose.connect(process.env.MONGO_URI);
      mongoose.set("strictQuery", true);
      app.listen(PORT, () => {
         console.log(`Listening on PORT ${PORT}`);
      });
      console.log("Connection to DB Successful");
   } catch (error) {
      console.log(error);
   }
};

start();
