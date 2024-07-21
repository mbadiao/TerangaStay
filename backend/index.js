const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDataBase = require("./configuration/database");
const app = express();
const { config } = require("dotenv");
config();
app.use(cors());
app.use(cookieParser());

app.listen(8080, () => {
  console.log("app listen on 8080");
  connectDataBase();
});
