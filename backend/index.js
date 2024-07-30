const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDataBase = require("./configuration/database");
const app = express();
const { config } = require("dotenv");
const router = require("./routes/routes");

config();

app.use(cors({
  origin: process.env.HOST,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("app listen on 8080");
  connectDataBase();
});
