const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDataBase = require("./configuration/database");
const app = express();
const { config } = require("dotenv");
const router = require("./routes/routes");
config();
const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log("app listen on 8080");
  connectDataBase();
});
