const express = require("express");
const mongoose = require("mongoose");
//Imports
const authRouter = require("./routes/auth");
//Intialiazation
const PORT = 3000;
const app = express();
const DB = "mongodb+srv://vishnudev:Palnar%40123@cluster0.xgpznha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//Middleware
app.use(express.json());
app.use(authRouter);
//Db Connection
mongoose.connect(DB).then(() => {
  console.log("connection successfull")
}).catch((e) => {
  console.log(e);
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Connected at port ${PORT}`);
});
