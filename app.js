const path = require("path");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { Console } = require("console");
const app = express();
const PORT = 3600;
app.use(bodyParser.json());

//Adding cors to allow +5s requests:
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Conecting Data:
const conection = mysql.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Getting products:
app.get("/bsale/products", (req, res) => {
  const sql = "SELECT * FROM product";
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});

//Getting categories
app.get("/bsale/category/", (req, res) => {
  const sql = `SELECT * FROM category`;
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});
//Filter by categories
app.get("/bsale/products/category/:id", (req, res) => {
  console.log("req: ", req.params);
  const sql = `SELECT * FROM product WHERE category = ${req.params.id}`;
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});

//Filter by name
app.get("/bsale/products/name/:name", (req, res) => {
  console.log("req: ", req.params);
  const sql = `SELECT * FROM product WHERE name LIKE '%${req.params.name}%'`;
  conection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No se encontraron resultados");
    }
  });
});
