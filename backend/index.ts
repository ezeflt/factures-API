import express from "express";
import mysql from "mysql";
import myConnection from "express-myconnection";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

export const optionDb = {
  host: "localhost",
  user: "root",
  password: "root",
  port: 8889,
  database: "invoices",
};

var user = require("./src/route/user");
var file = require("./src/route/file");

const app = express();
app.use(myConnection(mysql, optionDb, "pool"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection(optionDb);
connection.connect();

const port = 3001;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use("/user", user);
app.use("/file", file);
