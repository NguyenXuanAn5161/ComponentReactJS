import bodyParser from "body-parser";
import express from "express";
// import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connectionDB
// connection();

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log("jwt backend is running on port = " + PORT);
});
