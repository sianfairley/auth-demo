require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "database",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists users; CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) not null, password VARCHAR(255) not null, PRIMARY KEY (id));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `users` was successful!");
  });

  sql = "INSERT INTO users (username, password) VALUES ('test', 'test');";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Test user created");

    console.log("Closing...");
  });

  con.end();
});
